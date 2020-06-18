import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment.prod';

@Injectable()
export class AuthService {

  headers: any = null;

  constructor(private http: HttpClient) {
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    };
  }

  authenticate(form) {
    return this.http.post(environment.base + 'authenticate', form);
  }

  register(form) {
    return this.http.post(environment.base + 'register', form);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
  }

  isAuthenticated() {
    return localStorage.getItem('token') !== null ? true : false;
  }
}
