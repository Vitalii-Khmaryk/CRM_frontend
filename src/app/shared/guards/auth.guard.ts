import { AuthService } from './../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthService);
  const router=inject(Router);
  return authService.isAuthenticated() ? true : false && router.navigate(['/login'],{
    queryParams:{
      accessDenied:true
    }
  })
};
