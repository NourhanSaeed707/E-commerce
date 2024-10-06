import { Gender } from "./gender";
import { CategoryType } from "./category";
import { Size } from "./size";
import { Color } from "./color";
import { Image } from "./image";
import { ProductColor } from "./product-color";

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
  productColors?: ProductColor[];
};

export type AddProductFieldsProps = {
  edit: boolean;
};

export type EditProductFieldsProps = {
  edit: boolean;
  imagesList: Image[];
  setImagesList: (imagesList: Image[]) => void;
  // colors: Color[];
};

export type ProductColorImgFieldsProps = {
  edit: boolean;
  color?: Color;
  imagesList: Image[];
  setImagesList: (imagesList: Image[]) => void;
};

export type ProductTableProps = {
  entities: ProductForm[];
  loading: boolean;
  errors: string | null;
  currentPage: number;
  total: number;
  setEntityIdDelete: (id) => void;
  handlePageChange: (page: number) => void;
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

export type ProductColorImageProps = {
  productId: number;
  colorId: number;
  images: Image[];
};

export type AddCancelButtonProps = {
  edit: boolean;
};

export type ProductDetailInfoType = {
  product: ProductForm,
  selectedColorId: number;
  SetSelectedColorId: (selectedColorId: number) => void;
  selectSizeId: number;
  setSelectedSizeId: (selectSizeId: number) => void;
    images: any[];
}

export type FiltrationSideMenuProps = {
  sortOrder?: "lowToHigh" | "highToLow" | null;
  setSortOrder?: (value: "lowToHigh" | "highToLow" | null) => void;
  setColorFilter?: (colorFilter: number | null) => void;
  setSizeFilter?: (colorFilter: number | null) => void;
  setCategoryTypeFilter?: (colorFilter: number | null) => void;
  colorFilter?: number | null;
  sizeFilter?: number | null;
  categoryTypeFilter?: number | null;
}

