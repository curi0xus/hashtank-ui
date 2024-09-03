import { createSupabaseClient } from "@/util/supabase/server";

export const storeFileUrls = async (
  silhouetteUrl: string,
  metadataUrl: string,
  fishId: string,
) => {
  console.log("silhouetteUrl", silhouetteUrl);
  console.log("metadataUrl", metadataUrl);

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('fish')
    .insert([
      {
        id: fishId, // Ensure this ID is unique and properly formatted
        silhouette_url: silhouetteUrl,
        metadata_url: metadataUrl,
        fishtype_id: fishId, // Use the correct column name here,
        state: 'unrevealed',
      }
    ]);

  console.log('Insert Response:', data, error);

  if (error) {
    throw new Error(`Error inserting fish record: ${error.message}`);
  }

  return data;
};
