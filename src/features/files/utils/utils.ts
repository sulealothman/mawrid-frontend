export const isAllowedSize = (size : number, limit: number) => {
    return size < limit;
}

export const isAllowedMime = (fileName:string, filesTypes: Array<string>) => {
  const extension: string = fileName.split('.').pop()!.toLowerCase();
  return filesTypes.includes(extension);
}

export function splitFileObj(fileName: string, firstKey: string, secondKey: string) : object {
  const obj: { [key: string]: string } = {};
  obj[firstKey] = fileName.substring(0, fileName.lastIndexOf('.'));
  obj[secondKey] = fileName.split('.').pop()!.toLowerCase();
  return obj;
}

export const convertMegabytesToBytes = (megaBytes:number) => {
  return Math.ceil(megaBytes / (1024 * 1024));
}

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + sizes[i];
};