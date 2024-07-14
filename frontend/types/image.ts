import { Category } from "./category";
import { Product } from "./product";

export type UploadImageProps = {
  size: number;
  imageUrl?: string;
  imagesList: any[];
  addImage: (newImageUrl: string) => void;
  removeImage: (newImageUrl: string) => void;
};

export type Image = {
  id?: number,
  createdAt?: Date;
  lastModifiedAt?: Date;
  createdBy?: string;
  imageUrl: string;
  product?: Product
}
