"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Folder, FileText, Send, Menu } from "lucide-react";

export const DocumentChatInterface = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="flex flex-col h-full p-4">
          <h2 className="text-2xl font-bold mb-4">DocuChat</h2>
          <Button className="mb-4" onClick={() => alert("Create folder")}>
            <PlusCircle className="mr-2 h-4 w-4" /> New Folder
          </Button>
          <ScrollArea className="flex-grow">
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => alert("Open folder")}
              >
                <Folder className="mr-2 h-4 w-4" /> Study Materials
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => alert("Open folder")}
              >
                <Folder className="mr-2 h-4 w-4" /> Research Papers
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => alert("Open folder")}
              >
                <Folder className="mr-2 h-4 w-4" /> Assignments
              </Button>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">Your Documents</h1>
          <Button onClick={() => alert("Upload document")}>
            <PlusCircle className="mr-2 h-4 w-4" /> Upload
          </Button>
        </header>

        {/* Document List and Chat Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Document List */}
          <div className="w-1/3 border-r overflow-y-auto p-4 hidden md:block">
            <h2 className="text-lg font-semibold mb-4">Documents</h2>
            <div className="space-y-2">
              {["Physics Notes", "History Essay", "Math Homework"].map(
                (doc) => (
                  <Button
                    key={doc}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setSelectedDocument(doc)}
                  >
                    <FileText className="mr-2 h-4 w-4" /> {doc}
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedDocument ? (
              <>
                <div className="flex-1 p-4 overflow-y-auto">
                  <h2 className="text-lg font-semibold mb-4">
                    Chat with: {selectedDocument}
                  </h2>
                  {/* Chat messages would go here */}
                  <div className="space-y-4">
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="font-semibold">AI Assistant</p>
                      <p>Hello! How can I help you with {selectedDocument}?</p>
                    </div>
                    <div className="bg-primary text-primary-foreground p-3 rounded-lg ml-auto max-w-[80%]">
                      <p className="font-semibold">You</p>
                      <p>Can you summarize the key points in this document?</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="p-4">
                  <form
                    className="flex space-x-2"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <Input
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button type="submit">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                Select a document to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
