import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CartItem} from "../../models/CartItem";
import {OrderItem} from "../../models/OrderItem";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = 'http://localhost:8080/orders';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) {
  }

  getOrderItems(orderId: number): Observable<OrderItem[]> {
    const url = `${this.orderUrl}/${orderId}`;

    return this.http.get<OrderItem[]>(url);
  }

  order(cartItem: CartItem[]): Observable<CartItem[]> {
    const url = `${this.orderUrl}/make-order`

    return this.http.post<CartItem[]>(url, cartItem);
  }
}
