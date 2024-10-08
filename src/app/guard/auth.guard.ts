import { isPlatformBrowser, isPlatformServer, Location } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const location = inject(Location);
  const currentUrl = location.path();

  // if (isPlatformServer(platformId)) {
  //   return true;
  // }

  if (isPlatformBrowser(platformId)) {
    if (authService.isAdmin()) {
      return true;
    } else {
      // return router.createUrlTree(['/']);
      return router.navigateByUrl('/');
    }
  } else {
    return false;
  }

  // if (isPlatformServer(platformId)) {
  //   return true;
  // }

  // if (isPlatformBrowser(platformId)) {
  //   if (authService.isAdmin()) {
  //     return true;
  //   } else {
  //     return router.createUrlTree(['/']);
  //   }
  // }
  // return false;
};
