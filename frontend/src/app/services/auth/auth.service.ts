import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {environment} from "../../../enviroments/enviroment";
import {RegisterInfo} from "../../models/RegisterInfo";
import {TokenStorageService} from "../storage/token-storage.service";

const AUTH_API = 'http://localhost:8080/auth';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {
    this.userSubject = new BehaviorSubject<User | null>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  isUserLogged() {
    return this.tokenStorage.getToken() !== null;
  }

  public initUser(user: User) {
    this.userSubject.next(user);
  }

  register(registerInfo: RegisterInfo) {
    return this.http.post<User>(`${environment.apiUrl}/auth/signup`, registerInfo, { withCredentials: true });
  }

  login(username: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/auth/signin`, { username, password }, { withCredentials: true })
      .pipe(map(user => {
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    this.tokenStorage.signOut();
    this.http.post<any>(`${environment.apiUrl}/auth/signout`, {}, { withCredentials: true }).subscribe();
    this.userSubject.next(null);
    this.router.navigate(['']);
  }

  refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}/auth/refresh-token`, {}, { withCredentials: true })
      .pipe(map((user) => {
        this.userSubject.next(user);
        return user;
      }));
  }
}
