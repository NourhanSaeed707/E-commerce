import { Product } from './product';
export type CategoryType =  {
   id?: Number;
   name?: String;
   createdAt?: Date;
   lasteModifiedAt?: Date;
   createdBy?: String;
}

export type Category = {
   id?: Number;
   categoryType: CategoryType,
   product: Product,
   createdAt?: Date,
   lastModifiedAt?: Date,
   createdBy?: String,
   images: Image[],
}

export type Image = {
   id: Number,
   createdAt?: Date,
   lastModifiedAt?: Date,
   imageUrl: string,
}

export type CategoryTypeTableProps = {
   entities: CategoryType[];
   loading: boolean;
   errors: string | null;
   setEntityIdDelete: (id) => void;
}

export type DataTypeTable = {
   key: string;
   id: number;
   name: string;
   createdAt: number;
 }

export type CategoryTypeEditProps = {
   edit: boolean
}

export type editFacadeProps = {
   id: Number,
   formRef: any
}
