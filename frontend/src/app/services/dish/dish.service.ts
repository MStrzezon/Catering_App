import {Injectable} from '@angular/core';
import {Dish} from "../../models/Dish";
import { map, max, Observable } from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private dishesUrl = 'http://localhost:8080/dishes';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.dishesUrl);
  }

  createDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.dishesUrl, dish, this.httpOptions);
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



  deleteDish(id: number): Observable<Dish> {
    const url = `${this.dishesUrl}/${id}`;
    return this.http.delete<Dish>(url, this.httpOptions);
  }
}
