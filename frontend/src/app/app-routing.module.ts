import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DishListComponent} from "./components/dish-list/dish-list.component";
import {CartComponent} from "./components/cart/cart.component";
import {CreateDishComponent} from "./components/create-dish/create-dish.component";
import {DishDetailComponent} from "./components/dish-detail/dish-detail.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {StartViewComponent} from "./components/start-view/start-view.component";

const routes: Routes = [
  { path: '', component: StartViewComponent },
  { path: 'menu', component: DishListComponent },
  { path: 'create-dish', component: CreateDishComponent },
  { path: 'cart', component: CartComponent },
  { path: 'menu/:id', component: DishDetailComponent },
  { path: 'orders', component: OrdersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
