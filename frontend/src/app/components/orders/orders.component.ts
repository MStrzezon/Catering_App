import { Component } from '@angular/core';
import {OrderService} from "../../services/order/order.service";
import {CartItem} from "../../models/CartItem";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  constructor(private orderService: OrderService) {
  }

  productInOrders: CartItem[]=[];
  total = 0;

  ngOnInit() {
    this.orderService.getOrderItems(3).subscribe(prods => {
      this.productInOrders = prods;
    });
  }

  ngAfterContentChecked() {
    this.total = this.productInOrders.reduce(
      (prev, cur) => prev + cur.quantity * cur.dish.price, 0);
  }

}
