import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart/cart.service";
import {Dish} from "../../models/Dish";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) {
  }

  productInOrders: Dish[]=[];
  total = 0;

  static validateCount(productInOrder: Dish) {
    const max = productInOrder.price;
    if (productInOrder.quantity > max) {
      productInOrder.quantity = max;
    } else if (productInOrder.quantity < 1) {
      productInOrder.quantity = 1;
    }
    console.log(productInOrder.quantity);
  }

  ngOnInit() {
    this.cartService.getCart().subscribe(prods => {
      this.productInOrders = prods;
    });
  }

  ngAfterContentChecked() {
    this.total = this.productInOrders.reduce(
      (prev, cur) => prev + cur.quantity * cur.price, 0);
  }

  addOne(productInOrder: Dish) {
    productInOrder.quantity++;
    CartComponent.validateCount(productInOrder);
  }

  minusOne(productInOrder: Dish) {
    productInOrder.quantity--;
    CartComponent.validateCount(productInOrder);
  }

  onChange(productInOrder: Dish) {
    CartComponent.validateCount(productInOrder);
  }


  remove(productInOrder: Dish) {
    this.cartService.remove(productInOrder.dishId).subscribe(
      () => {
        this.productInOrders = this.productInOrders.filter(e => e.name !== productInOrder.name);
        console.log('Cart: ' + this.productInOrders);
      },
        (_: any) => console.log('Remove Cart Failed'));
  }


}
