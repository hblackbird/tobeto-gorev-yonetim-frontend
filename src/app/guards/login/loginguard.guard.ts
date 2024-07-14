import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const loginguardGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let routerService = inject(Router)
  if(authService.isLoggedIn()){
    routerService.navigate(['/']);
    return false;
  }
  return true;
};
