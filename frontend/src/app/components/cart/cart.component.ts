import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart/cart.service";
import {CartItem} from "../../models/CartItem";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) {
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
    console.log(productInOrder.quantity);
  }

  ngOnInit() {
    this.cartService.getCartItems(1).subscribe(prods => {
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


  remove(productInOrder: CartItem) {
    this.productInOrders = this.productInOrders.filter(d => d !== productInOrder);
    this.cartService.removeFromCart(1, productInOrder.dish.dishId, productInOrder.quantity).subscribe();
  }
}
