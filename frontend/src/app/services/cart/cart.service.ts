import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dish} from "../../models/Dish";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartUrl = 'api/cart';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getCart(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.cartUrl);
  }

  remove(id: number): Observable<Dish>{
    const url = `${this.cartUrl}/${id}`;
    return this.http.delete<Dish>(url, this.httpOptions);
  }
}
