import { Injectable } from '@angular/core';
import { ENV } from '../core/env.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: any;
  constructor(private http: HttpClient) {
  }
  setAccessToken(token) {
    localStorage.setItem('access_token', token);
    return;
  }
  getAccessToken() {
    return localStorage.getItem('access_token');
  }
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
    return;
  }
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    return;
  }
  getUser() {
    return localStorage.getItem('user') ?
      JSON.parse(localStorage.getItem('user')) : {};
  }
  isLoggedIn() {
    // console.log("ACCESS TOKEN ", localStorage.getItem('access_token'));
    return localStorage.getItem('access_token') !== null;
  }
  login(user: object): Observable<any> {
    return this.http.post(ENV.LOGIN, user);
  }
}
