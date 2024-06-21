export type CategoryType =  {
   id?: Number;
   name: String;
   createdAt?: Date;
   lasteModifiedAt?: Date;
   createdBy?: String;
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
