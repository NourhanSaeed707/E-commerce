import { ProductForm } from "./product";
import { UserType } from "./users";

export type IOrder = {
    id?: number;
    user: UserType;
    products: ProductForm[];
    orderDate: Date;
    quantity: number;
    totalPrice: number;
    status: OrderStatus;
}
export enum OrderStatus  {
    PENDING = "PENDING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
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
  