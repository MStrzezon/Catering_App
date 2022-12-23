import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {DishCuisine} from "../../models/DishCuisine";

@Injectable({
  providedIn: 'root'
})
export class DishCuisineService {

  private dishCuisinesUrl = 'http://localhost:8080/dish-cuisines';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) {
  }

  findAll(): Observable<DishCuisine[]> {
    return this.http.get<DishCuisine[]>(this.dishCuisinesUrl);
  }
}
