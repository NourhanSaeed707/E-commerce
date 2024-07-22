export type AddServices = {
  apiUrl: string;
  token: string;
  body: any;
};

export type DeleteAndGetOneServices = {
  apiUrl: string;
  token: string;
  id: Number;
};

export type EditServices = {
  apiUrl: string;
  token: string;
  id: Number;
  body: any;
};

export type GetAllServices = {
  apiUrl: string;
  token: string;
};

export type IGetOneByObjectService = {
  apiUrl: string;
  token: string;
  object: any;
};
