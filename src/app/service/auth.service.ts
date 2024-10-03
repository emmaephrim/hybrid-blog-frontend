import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signupUrl = 'http://localhost:8080/api/auth/signup';
  private loginUrl = 'http://localhost:8080/api/authenticate';

  jwtHelper: JwtHelperService = new JwtHelperService();

  private adminStatus: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.checkAdminStatus();
  }

  public signup(user: User): Observable<User> {
    return this.http.post<User>(this.signupUrl, user);
  }

  public login(user: User): Observable<User> {
    return this.http.post<User>(this.loginUrl, user);
  }

  storeToken(token: string) {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (this.isBrowser()) {
      return localStorage.getItem('token') !== null;
    }
    return false;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null; // Optionally, check token expiration
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }

  // isAuthenticated() {
  //   const token = localStorage.getItem('token');
  //   return !new JwtHelperService().isTokenExpired(token);
  // }

  getRole(): string {
    if (this.isBrowser()) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken.role; // Get the role from the token
      }
    }
    return '';
  }

  getUserId(): string {
    if (this.isBrowser()) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken.userId;
      }
    }
    return '';
  }

  checkAdminStatus() {
    return of(this.getRole() === 'ROLE_ADMIN').subscribe((status) => {
      this.adminStatus = status;
    });
  }

  // isAdmin(): boolean {
  //   return this.getRole() === 'ROLE_ADMIN';
  // }

  isAdmin(): boolean {
    return this.adminStatus;
  }

  isAdminAsync(): Observable<boolean> {
    return of(this.getRole() === 'ROLE_ADMIN');
  }

  isNormalUser(): boolean {
    return this.getRole() === 'ROLE_USER';
  }

  public isBrowser(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    );
  }
}
