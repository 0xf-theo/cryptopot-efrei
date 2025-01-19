import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../schemas/api.schemas';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: boolean = false;
  private user: User | null = null;

  constructor(private _http: HttpClient, private _route: Router) {
    if (localStorage.getItem('token') != null) {
      this.loggedIn = true;
    }

    if (localStorage.getItem('user') != null) {
      try {
        this.user = JSON.parse(localStorage.getItem('user') || '');

        this._http.get(environment.apiUrl + '/api/me').subscribe({
          next: (v: any) => {
            this.user = v;
            localStorage.setItem('user', JSON.stringify(v));
          },
          error: (e) => {
            console.log(e);
            this.logout();
          },
        });
      } catch (e) {
        console.log(e);
        this.logout();
      }
    }
  }

  login(mail: string, password: string) {
    return new Promise((resolve, reject) => {
      const url = environment.apiUrl + '/api/login_check';
      const login = { mail: mail, password: password };
      return this._http.post(url, login).subscribe({
        next: (v: any) => {
          localStorage.setItem('token', v.token);
          this._http.get(environment.apiUrl + '/api/me').subscribe({
            next: (v: any) => {
              this.loggedIn = true;
              this.user = v;
              localStorage.setItem('user', JSON.stringify(v));
              resolve(true);
            },
            error: (e) => {
              reject(e);
            },
          });
        },
        error: (e) => {
          reject(e);
        },
      });
    });
  }

  getUser(): User | null {
    return this.user;
  }

  forgotPassword(email: string) {
    const url = environment.apiUrl + '/api/user/{id}';
    const data = { email: email };
    return this._http.post(url, data);
  }
  logout() {
    this.loggedIn = false;
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._route.navigate(['/']);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  isAdmin() {
    return (this.user?.roles || []).includes('ROLE_ADMIN');
  }

  refresh() {
    if(this.user) {
      this._http.get(environment.apiUrl + '/api/me').subscribe({
        next: (v: any) => {
          this.user = v;
          localStorage.setItem('user', JSON.stringify(v));
        },
        error: (e) => {
          console.log(e);
          this.logout();
        },
      });
    }
  }
}
