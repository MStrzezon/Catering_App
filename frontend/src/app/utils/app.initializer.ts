import {catchError, finalize, of} from 'rxjs';
import {AuthService} from "../services/auth/auth.service";
import {TokenStorageService} from "../services/storage/token-storage.service";

export function appInitializer(authenticationService: AuthService, tokenService: TokenStorageService) {
  return () => {
    let user = tokenService.getUser();
    console.log(user);
    if (user !== null) {
      authenticationService.initUser(user);
    }
  }
}
