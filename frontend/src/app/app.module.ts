import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { DishListComponent } from './components/dish-list/dish-list.component';
import { CreateDishComponent } from './components/create-dish/create-dish.component';


import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { StarComponent } from './components/star/star.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { FilterBoxComponent } from './components/filter-box/filter-box.component';
import { CartComponent } from './components/cart/cart.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import { DishDetailComponent } from './components/dish-detail/dish-detail.component';
import {MatInputModule} from "@angular/material/input";
import { OrdersComponent } from './components/orders/orders.component';
import { StartViewComponent } from './components/start-view/start-view.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import {AuthService} from "./services/auth/auth.service";
import {authInterceptorProviders} from "./utils/auth-interceptor/auth.interceptor";
import {ErrorInterceptor} from "./utils/error-interceptor/error.interceptor";
import {JwtInterceptor} from "./utils/jwt-interceptor/jwt.interceptor";
import {appInitializer} from "./utils/app.initializer";
import {TokenStorageService} from "./services/storage/token-storage.service";



@NgModule({
  declarations: [
    AppComponent,
    DishListComponent,
    CreateDishComponent,
    StarRatingComponent,
    StarComponent,
    CartComponent,
    FilterPipePipe,
    FilterBoxComponent,
    CartComponent,
    NavbarComponent,
    DishDetailComponent,
    OrdersComponent,
    StartViewComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService, TokenStorageService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
