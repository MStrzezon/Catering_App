import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Review} from "../../models/Review";
import {Observable} from "rxjs";
import {DishCuisine} from "../../models/DishCuisine";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private ratingUrl = 'http://localhost:8080/reviews';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.ratingUrl, review);
  }

  reviews(dishId: number): Observable<Review[]> {
    let params = new HttpParams();
    params = params.append('dishId', dishId);
    return this.http.get<Review[]>(this.ratingUrl,{
      params: params
    });
  }
}
