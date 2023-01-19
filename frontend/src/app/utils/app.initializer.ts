import { catchError, finalize, of } from 'rxjs';
import {AuthService} from "../services/auth/auth.service";

export function appInitializer(authenticationService: AuthService) {
  return null;
}
