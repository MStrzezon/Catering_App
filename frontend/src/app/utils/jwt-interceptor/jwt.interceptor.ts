import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";
import {environment} from "../../../enviroments/enviroment";
import {TokenStorageService} from "../../services/storage/token-storage.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService, private tokenStorageService: TokenStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const isLoggedIn = this.authenticationService.isUserLogged();
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    console.log("intercept");
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.tokenStorageService.getToken()}` }
      });
    }

    return next.handle(request);
  }
}
