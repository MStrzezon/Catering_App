import {Ingredient} from "./Ingredient";
import {Rating} from "./Rating";
import {Image} from "./Image";
import {DishCuisine} from "./DishCuisine";
import {DishCategory} from "./DishCategory";

export class Dish {

  dishId: number;
  name: string;
  quantity: number;
  price: number;
  ingredients: Ingredient[];
  dishCategory: DishCategory;
  dishCuisine: DishCuisine;
  ratings: Rating[];
  images: Image[];
  description: string;

  available: number;
}
