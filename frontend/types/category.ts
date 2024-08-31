import { ProductForm } from "@/types/product";
export type CategoryType = {
  id?: Number;
  name?: String;
  createdAt?: Date;
  lasteModifiedAt?: Date;
  createdBy?: String;
};

export type Category = {
  id?: Number;
  categoryType: CategoryType;
  product: ProductForm;
  createdAt?: Date;
  lastModifiedAt?: Date;
  createdBy?: String;
  images: Image[];
};

export type Image = {
  id: Number;
  createdAt?: Date;
  lastModifiedAt?: Date;
  imageUrl: string;
};

export type CategoryTypeTableProps = {
  entities: CategoryType[];
  loading: boolean;
  errors: string | null;
  total: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  setEntityIdDelete: (id) => void;
};

export type DataTypeTable = {
  key: string;
  id: number;
  name: string;
  createdAt: number;
};

export type CategoryTypeEditProps = {
  edit: boolean;
};

export type editFacadeProps = {
  id: Number;
  formRef: any;
};
