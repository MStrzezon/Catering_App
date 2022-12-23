import {Component, OnInit} from '@angular/core';
import {DishService} from "../../services/dish/dish.service";
import {faPlus, faMinus, faDollar, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {Dish} from "../../models/Dish";


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

  searchRatings: number[] = [];

  searchMinPrice: number[]=[];

  searchMaxPrice: number[]=[];

  constructor(private dishService: DishService) {
  }

  ngOnInit() {
    this.getDishes();
  }

  getDishes(): void {
    this.dishService.findAll().subscribe(dishes => {
      console.log(dishes);
        this.dishes = dishes;
        dishes.forEach(dish => {
          dish.available = dish.quantity;
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

  public addItem(dish: any) {
    if (dish.available > 0) {
      dish.available--;
    }
  }

  public removeItem(dish: any) {
    if (dish.available < dish.amount) {
      dish.available++;
    }
  }

  public delete(dish: Dish) {
    this.dishes = this.dishes.filter(d => d !== dish);
    this.dishService.deleteDish(dish.dishId).subscribe();
  }

}
