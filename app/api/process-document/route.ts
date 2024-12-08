import { createClient } from "@/lib/supabase/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";

const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;

export async function POST(req: Request) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { fileName, userId, apiKey } = await req.json();

    const configuration = new Configuration({
      // apiKey: process.env.OPENAI_API_KEY || apiKey,
      apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);

    // get document with name "fileName" from Supabase database
    const { data: document, error: documentError } = await supabase
      .from("documents")
      .select("*")
      .eq("name", fileName)
      .single();
    console.log("DOCUMENT ERROR ===>", documentError);
    if (documentError) throw documentError;

    // Download the file from Supabase Storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from("documents")
      .download(fileName);
    if (downloadError) throw downloadError;

    // Convert PDF to text
    const loader = new PDFLoader(fileData);
    const docs = await loader.load();
    let fullText = "";

    for (const doc of docs) {
      const pageText = doc.pageContent.replace(/\n/g, " ");
      fullText += pageText + " ";
    }

    console.log("FULL TEXT ===>", fullText.slice(0, 10));

    // Split text using LangChain's text splitter
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: CHUNK_SIZE,
      chunkOverlap: CHUNK_OVERLAP,
    });

    const chunks = await textSplitter.splitText(fullText);
    console.log("CHUNKS ===>", chunks.length);

    // Generate embeddings and store in Supabase
    for (const chunk of chunks) {
      console.log("CHUNK ===>", chunk);

      const embedding = await openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: chunk,
      });

      const embeddingData = await embedding.json();

      if (!embeddingData?.data)
        throw new Error("Seems like the api key is not set correctly");

      const [{ embedding: vector }] = embeddingData.data;

      const { error: insertError } = await supabase
        .from("document_chunks")
        .insert({
          content: chunk,
          document_id: document.id,
          user_id: userId,
          embedding: vector,
          metadata: {
            file_name: fileName,
          },
        });

      if (insertError) throw insertError;

      console.log("✅ COMPLETED CHUNK ===>", "\n\n");
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error processing document:", error?.message);
    return NextResponse.json(
      {
        error:
          "Failed to process document. Please make sure your api_key is set correctly",
      },
      { status: 500 }
    );
  }
}
