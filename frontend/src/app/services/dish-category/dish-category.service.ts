import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {DishCategory} from "../../models/DishCategory";

@Injectable({
  providedIn: 'root'
})
export class DishCategoryService {
  private dishCuisinesUrl = 'http://localhost:8080/dish-categories';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) {
  }

  findAll(): Observable<DishCategory[]> {
    return this.http.get<DishCategory[]>(this.dishCuisinesUrl);
  }
}
