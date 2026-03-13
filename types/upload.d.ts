type UploadItem = {
  id: string;
  file: File;
  progress: number;
  controller: AbortController;
};