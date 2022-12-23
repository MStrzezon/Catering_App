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
    const max = productInOrder.available;
    if (productInOrder.amount > max) {
      productInOrder.amount = max;
    } else if (productInOrder.amount < 1) {
      productInOrder.amount = 1;
    }
    console.log(productInOrder.amount);
  }

  ngOnInit() {
    this.cartService.getCart().subscribe(prods => {
      this.productInOrders = prods;
    });
  }

  ngAfterContentChecked() {
    this.total = this.productInOrders.reduce(
      (prev, cur) => prev + cur.amount * cur.price, 0);
  }

  addOne(productInOrder: Dish) {
    productInOrder.amount++;
    CartComponent.validateCount(productInOrder);
  }

  minusOne(productInOrder: Dish) {
    productInOrder.amount--;
    CartComponent.validateCount(productInOrder);
  }

  onChange(productInOrder: Dish) {
    CartComponent.validateCount(productInOrder);
  }


  remove(productInOrder: Dish) {
    this.cartService.remove(productInOrder.id).subscribe(
      () => {
        this.productInOrders = this.productInOrders.filter(e => e.name !== productInOrder.name);
        console.log('Cart: ' + this.productInOrders);
      },
        (_: any) => console.log('Remove Cart Failed'));
  }


}
