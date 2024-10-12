import { ProductForm } from "./product";
import { UserType } from "./users";

export type IOrder = {
  id?: number;
  user: UserType;
  product: ProductForm;
  orderDate: Date;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
};
export enum OrderStatus {
  PENDING = "PENDING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}
export type CartItem = {
  id: number;
  name: string;
  size: string;
  color: string;
  image: any;
  price: number;
  quantity: number;
};
export type IShippingInfo = {
  id?: number;
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  order?: IOrder;
};
export type ICreditCardInfo = {
  id?: number;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  cardholderName: string;
  order?: IOrder;
};
export type ICreckoutType = {
  orders: IOrder[];
  shippingInfo: IShippingInfo;
  creditCardInfo?: ICreditCardInfo;
};
