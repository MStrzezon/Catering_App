import {Component } from '@angular/core';
import { faShoppingCart, faBars, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../../services/auth/auth.service";
import {first} from "rxjs";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  faShoppingCart = faShoppingCart;

  faBars = faBars;

  faArrowRightFromBracket = faArrowRightFromBracket;

  constructor(private authService: AuthService) {
  }

  get isLogged() {
    return this.authService.isUserLogged();
  }

  logout() {
    this.authService.logout();
  }
}
