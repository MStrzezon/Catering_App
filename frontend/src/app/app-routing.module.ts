import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DishListComponent} from "./components/dish-list/dish-list.component";
import {CartComponent} from "./components/cart/cart.component";
import {CreateDishComponent} from "./components/create-dish/create-dish.component";
import {DishDetailComponent} from "./components/dish-detail/dish-detail.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {StartViewComponent} from "./components/start-view/start-view.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./utils/auth-guard/auth.guard";
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [
  { path: '', component: StartViewComponent },
  { path: 'menu', component: DishListComponent, canActivate: [AuthGuard] },
  { path: 'create-dish', component: CreateDishComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'menu/:id', component: DishDetailComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
