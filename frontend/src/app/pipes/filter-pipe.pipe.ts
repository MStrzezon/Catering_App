import { Pipe, PipeTransform } from '@angular/core';
import {Dish} from "../models/Dish";

@Pipe({
  name: 'filterPipe',
  pure: false
})
export class FilterPipePipe implements PipeTransform {

  transform(dishes: Dish[], cuisine_types: string[], min_price: number, max_price: number, ratings: number[], dish_types: string[]): Dish[] {
    if (!dishes) {
      return [];
    }
    console.log(min_price);
    console.log(max_price);

    return dishes
      .filter(dish =>  cuisine_types.length == 0 ? true : cuisine_types.includes(dish.cuisine_type))
      .filter(dish => (dish.price >= min_price) && (dish.price <= max_price))
      // .filter(dish => ratings.includes(dish.rating))
      .filter(dish => dish_types.includes(dish.dish_type) || dish_types.length == 0)
  }

}
