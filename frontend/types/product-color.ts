import { Color } from "./color";
import { ProductForm } from "./product";

export type ProductColor = {
  id?: number;
  createdAt?: Date;
  lastModifiedAt?: Date;
  createdBy?: string;
  color: Color;
  product: ProductForm;
};

export type GetColorImgFacade = {
  colorId: number;
  productId: number;
};
