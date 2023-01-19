import {Component, OnInit} from '@angular/core';
import { faShoppingCart, faBars, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../models/User";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faShoppingCart = faShoppingCart;

  faBars = faBars;

  faArrowRightFromBracket = faArrowRightFromBracket;

  user: User | null;
  constructor(private authService: AuthService) {
  }


  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      console.log("subscribe")
      this.user = user
    })
  }

  get isLogged() {
    return this.authService.isUserLogged();
  }

  logout() {
    this.authService.logout();
  }

}
