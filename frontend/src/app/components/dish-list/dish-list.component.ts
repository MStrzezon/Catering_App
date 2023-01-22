import {Component, OnInit} from '@angular/core';
import {DishService} from "../../services/dish/dish.service";
import {faPlus, faMinus, faDollar, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {Dish} from "../../models/Dish";
import {CartService} from "../../services/cart/cart.service";
import {User} from "../../models/User";
import {TokenStorageService} from "../../services/storage/token-storage.service";
import {AuthService} from "../../services/auth/auth.service";


@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {

  mostExpensiveValue = 0;

  cheapestValue = Math.min();

  faPlus = faPlus;

  faMinus = faMinus;

  faDollar = faDollar;

  faTrash = faTrashCan;
  dishes: Dish[] = [];

  searchCuisineTypes: string[] = [];

  searchDishesTypes: string[] = [];

  searchMinRating: number[] = [];

  searchMaxRating: number[] = [];

  searchMinPrice: number[] = [];

  searchMaxPrice: number[] = [];

  pageSize = 10;

  page = 1;
  user: User | null;

  constructor(private dishService: DishService, private cartService: CartService, private authService: AuthService) {
  }

  ngOnInit() {
    this.getDishes();
    this.authService.user.subscribe(user => {
      this.user = user
    })
  }

  getDishes(): void {
    this.dishService.findAll().subscribe(dishes => {
        this.dishes = dishes;
        dishes.forEach(dish => {
          this.cartService.getPortionOfDishInCarts(1, dish.dishId).subscribe(portion => {
            dish.reserved = portion;
          });
          if (dish.price > this.mostExpensiveValue) {
            this.mostExpensiveValue = dish.price;
          }
          if (dish.price < this.cheapestValue) {
            this.cheapestValue = dish.price;
          }
        })
      }
    )
  }

  public addItem(dish: Dish) {
    if (dish.quantity > 0) {
      dish.quantity--;
      dish.reserved++;
      console.log(this.user?.cartId)
      this.cartService.addToCart(this.user?.cartId, dish.dishId, 1).subscribe();
    }
  }

  public removeItem(dish: any) {
    if (dish.reserved > 0) {
      dish.reserved--;
      dish.quantity++;
      this.cartService.removeFromCart(this.user?.cartId, dish.dishId, 1).subscribe();
    }
  }

  public delete(dish: Dish) {
    if (confirm("Are you sure to delete " + dish.name)) {
      this.dishes = this.dishes.filter(d => d !== dish);
      this.dishService.deleteDish(dish.dishId).subscribe();
    }
  }

  pageSizeChanged(pageSize: number): void {
    this.pageSize = pageSize;
  }
}
