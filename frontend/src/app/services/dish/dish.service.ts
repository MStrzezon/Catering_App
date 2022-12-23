import {Injectable} from '@angular/core';
import {Dish} from "../../models/Dish";
import {distinct,  map, max, Observable } from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private dishesUrl = 'api/dishes';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.dishesUrl);
  }

  getCuisineTypes(): Observable<string[]> {
    return this.http.get<Dish[]>(this.dishesUrl).pipe(
      map((dishes: Dish[]) => dishes.map(dish => dish.cuisine_type))
    )
  }

  getMinPrice(): Observable<number[]> {
    return this.http.get<Dish[]>(this.dishesUrl).pipe(
      map((dishes: Dish[]) => dishes.map(dish => dish.price)),

    )
  }

  getMaxPrice(): Observable<number[]> {
    return this.http.get<Dish[]>(this.dishesUrl).pipe(
      map((dishes: Dish[]) => dishes.map(dish => dish.price)),
      max()
    )
  }

  getDishTypes(): Observable<string[]> {
    return this.http.get<Dish[]>(this.dishesUrl).pipe(
      map((dishes: Dish[]) => dishes.map(dish => dish.dish_type)),
      distinct()
    )
  }

  addDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.dishesUrl, dish, this.httpOptions);
  }

  deleteDish(id: number): Observable<Dish> {
    const url = `${this.dishesUrl}/${id}`;
    return this.http.delete<Dish>(url, this.httpOptions);
  }
}
