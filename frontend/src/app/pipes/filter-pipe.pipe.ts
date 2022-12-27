import { Pipe, PipeTransform } from '@angular/core';
import {Dish} from "../models/Dish";

@Pipe({
  name: 'filterPipe',
  pure: false
})
export class FilterPipePipe implements PipeTransform {

  transform(dishes: Dish[], dishCuisines: string[], min_price: number, max_price: number, ratings: number[], dishTypes: string[]): Dish[] {
    if (!dishes) {
      return [];
    }
    return dishes
      .filter(dish =>  dishCuisines.length == 0 ? true : dishCuisines.includes(dish.dishCuisine.name))
      .filter(dish => (dish.price >= min_price) && (dish.price <= max_price))
      // .filter(dish => ratings.includes(dish.rating))
      .filter(dish => dishTypes.includes(dish.dishCategory.name) || dishTypes.length == 0)
  }

}
