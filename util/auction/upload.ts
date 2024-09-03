import { createSupabaseClient } from "@/util/supabase/server";
import fs from 'fs/promises';
import path from 'path';

export const uploadFile = async (filePath: string, folder: string): Promise<string> => {
  const supabase = createSupabaseClient();

  // Read the file content
  const fileContent = await fs.readFile(filePath);
  const fileName = path.basename(filePath);

  // Upload file
  const { data, error } = await supabase.storage
    .from('FishBucket')
    .upload(`${folder}/${fileName}`, fileContent, {
      cacheControl: '3600',
      upsert: false
    });

  console.log('Upload Response:', data, error); // Debugging

  if (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = await supabase.storage
    .from('FishBucket')
    .getPublicUrl(`${folder}/${fileName}`);

  console.log('URL Response:', urlData); // Debugging

  if (!urlData || !urlData.publicUrl) {
    throw new Error(`No public URL found`);
  }

  return urlData.publicUrl;
};
