import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../services/order/order.service";
import {CartItem} from "../../models/CartItem";
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../models/User";
import {Order} from "../../models/Order";
import {OrderCollapse} from "../../utils/order-collapse";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  constructor(private orderService: OrderService, private authService: AuthService) {
  }

  orders: OrderCollapse[]=[];

  user: User | null;

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user
    })
    this.orderService.getOrders(this.user.id).subscribe(orders => {
      orders.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return (new Date(b.purchaseDate)).getTime() - (new Date(a.purchaseDate)).getTime();
      });
      this.orders = orders.map(order => new OrderCollapse(order, true, order.orderItems.reduce((prev, cur) => prev + cur.quantity * cur.dish.price, 0)));
      console.log(this.orders);
    });
  }

  // ngAfterContentChecked() {
  //   this.total = this.orders.reduce(
  //     (prev, cur) => prev + cur.quantity * cur.dish.price, 0);
  // }

}
