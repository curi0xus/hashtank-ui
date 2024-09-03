import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises';
import { uploadFile } from '@/util/auction/upload';
import { storeFileUrls } from '@/util/auction/storeFileUrl';

// Disable default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Directory to save files temporarily
const pathDist: string = path.join(process.cwd(), '/tmp');

const readFile = (
  req: NextApiRequest,
  saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  if (saveLocally) {
    options.uploadDir = pathDist;
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
    };
  }
  options.maxFileSize = 4000 * 1024 * 1024; // 4MB
  options.keepExtensions = true;

  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await fs.readdir(pathDist);
  } catch (error) {
    await fs.mkdir(pathDist);
  }

  try {
    const { fields, files } = await readFile(req, true);

    const silhouette = (files as any).silhouette ? (files as any).silhouette[0] : null;
    const metadata = (files as any).metadata ? (files as any).metadata[0] : null;
    const fishId = (fields as any).fishId ? (fields as any).fishId[0] : null;
    const fishName = (fields as any).fishName ? (fields as any).fishName[0] : null;

    if (!silhouette || !metadata || !fishId || !fishName) {
      return res.status(400).json({ error: "Missing required files or fish details" });
    }

    // Upload files
    console.log("Silhouette file path:", silhouette.filepath);
    const silhouetteUrl = await uploadFile(silhouette.filepath, 'silhouette');
    const metadataUrl = await uploadFile(metadata.filepath, 'metadata');

    // Store file URLs in Supabase
    await storeFileUrls(silhouetteUrl, metadataUrl, fishId);

    return res.status(200).json({ success: "Files uploaded and URLs stored successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to process request";
    return res.status(500).json({ error: errorMessage });
  }
};

export default handler;