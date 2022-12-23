import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DishListComponent} from "./components/dish-list/dish-list.component";
import {CartComponent} from "./components/cart/cart.component";
import {CreateDishComponent} from "./components/create-dish/create-dish.component";

const routes: Routes = [
  { path: '', component: DishListComponent },
  { path: 'create-dish', component: CreateDishComponent },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
