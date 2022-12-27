import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CartItem} from "../../models/CartItem";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartUrl = 'http://localhost:8080/carts';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getCartItems(cartId: number): Observable<CartItem[]> {
    const url = `${this.cartUrl}/${cartId}/items`;

    return this.http.get<CartItem[]>(url);
  }

  getPortionOfDishInCarts(cartId: number, dishId: number): Observable<number> {
    const url = `${this.cartUrl}/${cartId}/number-of-servings`;

    let params = new HttpParams();
    params = params.append('dishId', dishId);
    return this.http.get<number>(url, {
      params: params
    });
  }

  addToCart(cartId: number, dishId: number, quantity: number): Observable<CartItem[]> {
    const url = `${this.cartUrl}/${cartId}/add-item`;
    console.log(url);
    let params = new HttpParams();
    params = params.append('dishId', dishId);
    params = params.append('quantity', quantity);
    return this.http.post<CartItem[]>(url, {},{
      params: params
    });
  }

  removeFromCart(cartId: number, dishId: number, quantity: number): Observable<CartItem[]> {
    const url = `${this.cartUrl}/${cartId}/remove-item`;

    let params = new HttpParams();
    params = params.append('dishId', dishId);
    params = params.append('quantity', quantity);
    return this.http.post<CartItem[]>(url, {},{
      params: params
    });
  }
}
