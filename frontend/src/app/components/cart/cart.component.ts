import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart/cart.service";
import {CartItem} from "../../models/CartItem";
import {OrderService} from "../../services/order/order.service";
import {TokenStorageService} from "../../services/storage/token-storage.service";
import {User} from "../../models/User";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  user: User;

  constructor(private cartService: CartService, private orderService: OrderService, private authService: AuthService) {
  }

  productInOrders: CartItem[]=[];
  total = 0;

  static validateCount(productInOrder: CartItem) {
    const max = productInOrder.dish.price;
    if (productInOrder.quantity > max) {
      productInOrder.quantity = max;
    } else if (productInOrder.quantity < 1) {
      productInOrder.quantity = 1;
    }
  }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user
    })
    this.cartService.getCartItems(this.user.cartId).subscribe(prods => {
      this.productInOrders = prods;
    });
  }

  ngAfterContentChecked() {
    this.total = this.productInOrders.reduce(
      (prev, cur) => prev + cur.quantity * cur.dish.price, 0);
  }

  addOne(productInOrder: CartItem) {
    productInOrder.quantity++;
    CartComponent.validateCount(productInOrder);
  }

  minusOne(productInOrder: CartItem) {
    productInOrder.quantity--;
    CartComponent.validateCount(productInOrder);
  }

  onChange(productInOrder: CartItem) {
    CartComponent.validateCount(productInOrder);
  }

  buy(productInOrder: CartItem) {
    this.productInOrders = this.productInOrders.filter(d => d !== productInOrder);

    this.orderService.order([productInOrder]).subscribe(_ => confirm("Produkt został zakupiony"));
    this.productInOrders = [];
  }
  remove(productInOrder: CartItem) {
    this.productInOrders = this.productInOrders.filter(d => d !== productInOrder);
    this.cartService.removeFromCart(this.user.cartId, productInOrder.dish.dishId, productInOrder.quantity).subscribe();
  }

  buyAll() {
    this.orderService.order(this.productInOrders).subscribe(_ => confirm("Koszyk został zakupiony"));
    this.productInOrders = [];
  }
}
