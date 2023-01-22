import {OrderItem} from "./OrderItem";

export class Order {
  id: number;

  orderItems: OrderItem[];

  purchaseDate: Date;
}
