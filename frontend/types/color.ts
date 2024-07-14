export type Color = {
  id?: Number;
  createdAt?: Date;
  lastModifiedAt?: Date;
  createdBy?: string;
  color: string;
};
export type AddColorFieldsProps = {
  edit: boolean;
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
  setEntityIdDelete: (id) => void;
};
export type EditColorFacadeProps = {
  id: number;
  formRef: any;
};
