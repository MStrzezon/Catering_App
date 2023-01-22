import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private ratingUrl = 'http://localhost:8080/ratings';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getRating(userId: number, dishId: number): Observable<number> {
    return this.http.get<number>(`http://localhost:8080/user/${userId}/ratings/dishes/${dishId}`);
  }

  updateRating(userId: number, dishId, newRating: number): Observable<number> {
    let params = new HttpParams();
    params = params.append('value', newRating);
    return this.http.post<number>(`http://localhost:8080/user/${userId}/ratings/dishes/${dishId}`, {}, {params: params});
  }
}
