import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
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
    DishDetailComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
