export type Color = {
  id?: number;
  createdAt?: Date;
  lastModifiedAt?: Date;
  createdBy?: string;
  color?: string;
  imageUrl?: string;
};
export type AddColorFieldsProps = {
  edit: boolean;
  imageUrl: any[];
  setImageUrl: (imageUrl: any[]) => void;
};
export type DataColorTypeTable = {
  key: string;
  id: number;
  createdAt: string;
  color: string;
};
export type ColorTableProps = {
  entities: Color[];
  loading: boolean;
  errors: string | null;
  currentPage: number;
  total: number;
  setEntityIdDelete: (id) => void;
  handlePageChange: (page: number) => void;
};
export type EditColorFacadeProps = {
  id: number;
  formRef: any;
};
