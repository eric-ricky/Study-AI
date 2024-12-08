import { createClient } from "@/lib/supabase/server";
import { Folder } from "@/lib/types";

export const createFolder = async (folder: Folder) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("folders")
    .insert(folder)
    .select();
  if (error) throw error;
  return data;
};

export const getFolders = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("folders").select("*");
  if (error) throw error;
  return data;
};
