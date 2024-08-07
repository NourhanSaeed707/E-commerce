export type Size = {
  id?: number;
  createdAt?: Date;
  lastModifiedAt?: Date;
  createdBy?: string;
  size?: string;
};
export type AddSizeFieldsProps = {
  edit: boolean;
};
export type DataSizeTypeTable = {
  key: string;
  id: number;
  size: string;
  createdAt: number;
};
export type SizeTableProps = {
  entities: Size[];
  loading: boolean;
  errors: string | null;
  setEntityIdDelete: (id) => void;
};

export type EditSizeFacadeProps = {
  id: number,
  formRef: any,
}
