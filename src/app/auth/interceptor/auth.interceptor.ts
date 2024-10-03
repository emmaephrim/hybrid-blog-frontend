// import { Injectable } from '@angular/core';
// import {
//   HttpEvent,
//   HttpInterceptor,
//   HttpHandler,
//   HttpRequest,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Router } from '@angular/router';
// import { AuthService } from '../../service/auth.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService, private router: Router) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     console.log('Request intercepted:', req);
//     return next.handle(req).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 401) {
//           // Token is expired or unauthorized access, logout the user
//           this.authService.logout(); // Clear any stored tokens
//           this.router.navigate(['/login']); // Redirect to the login page
//         }
//         return throwError(() => error);
//       })
//     );
//   }
// }

import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // console.log('Request intercepted:', req);
      if (error.status === 401) {
        console.log('401 error intercepted');
        authService.logout(); // Clear any stored tokens
        router.navigate(['/login']); // Redirect to the login page
      }
      return throwError(() => error);
    })
  );
};
