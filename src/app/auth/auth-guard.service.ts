import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.authService.isAuthenticated().pipe(
      map(isAuth => {
        if (isAuth) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
