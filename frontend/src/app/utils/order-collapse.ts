import {Order} from "../models/Order";

export class OrderCollapse {
  order: Order;
  isCollapsed: boolean;

  total: number;

  constructor(order, isCollapsed, total) {
    this.order = order;
    this.isCollapsed = isCollapsed;
    this.total = total;
  }
}
