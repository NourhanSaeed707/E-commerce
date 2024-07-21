import { Gender } from "./gender";
import { CategoryType } from "./category";
import { Size } from "./size";
import { Color } from "./color";
import { Image } from "./image";

export type ProductForm = {
  id?: number;
  name: string;
  createdAt?: Date;
  lastModifiedAt?: Date;
  createdBy?: string;
  codeNumber: string;
  price: number;
  stock: number;
  gender: Gender;
  categoryType?: CategoryType;
  size?: Size[];
  color?: Color[];
  images?: Image[];
};

export type AddProductFieldsProps = {
  edit: boolean;
  imagesList: Image[];
  setImagesList: (imagesList: Image[]) => void;
};

export type ProductTableProps = {
  entities: ProductForm[];
  loading: boolean;
  errors: string | null;
  setEntityIdDelete: (id) => void;
};

export type DataProductTypeTable = {
  key: string;
  id: number;
  name: string;
  createdAt: number;
  price: number;
  stock: number;
  categoryType?: CategoryType;
};

export type EditProductFacadeProps = {
  id: Number;
  formRef: any;
  listingImages: Image[];
  setListingImages: (listingImages: Image[]) => void;
};

export type ProductColorImage = {
  productId: number,
  color:  Color;
  imagesList: Image[],
};
