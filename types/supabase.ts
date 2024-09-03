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
  