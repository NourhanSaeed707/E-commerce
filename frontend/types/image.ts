export type UploadImageProps = {
  size: number;
  imageUrl?: string;
  imagesList: any[];
  addImage: (newImageUrl: string) => void;
  removeImage: (newImageUrl: string) => void;
};
