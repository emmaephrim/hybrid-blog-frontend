// import { ResolveFn } from '@angular/router';

// export const adminResolver: ResolveFn<boolean> = (route, state) => {
//   return true;
// };

// import { Injectable } from '@angular/core';
// import {
//   Resolve,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../service/auth.service';

// @Injectable({ providedIn: 'root' })
// export class AdminResolver implements Resolve<boolean> {
//   constructor(private authService: AuthService) {}

//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> {
//     return this.authService.isAdminAsync();
//   }
// }

import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminResolver implements Resolve<boolean> {
  constructor(private authService: AuthService, private router: Router) {}

  resolve(): Observable<boolean> {
    return of(this.authService.isAdmin()).pipe(
      tap((isAdmin) => {
        if (!isAdmin) {
          this.router.navigate(['/']); // Redirect non-admin users
        }
      })
    );
  }
}
