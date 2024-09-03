import { File as FormidableFile } from 'formidable';

export interface Fish {
  state: 'unrevealed' | 'revealed';
  silhouette_url: string;
  metadata_url: string;
  fishType_id: string;
}

export interface SupabaseFileUploadResponse {
  data: {
    path: string;
  };
  error: null | {
    message: string;
  };
}

export interface SupabaseUrlResponse {
  publicURL: string;
  error: null | {
    message: string;
  };
}

// Define UploadFishFields
export interface UploadFishFields {
  fishTypeId?: string[];
}

// Adjust the UploadedFiles interface if necessary
export interface UploadedFiles {
  silhouette?: FormidableFile[];
  metadata?: FormidableFile[];
}
