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
  total: number,
  currentPage: number;
  handlePageChange: (page: number) => void;
  setEntityIdDelete: (id) => void;
};

export type EditSizeFacadeProps = {
  id: number,
  formRef: any,
}
