import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment.prod';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from './models/user';

@Injectable()
export class AuthService {


  auth = new BehaviorSubject<User>(null);
  auth$ = this.auth.asObservable();

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
    return new Observable((observer) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      observer.next('logout');
    });
  }

  isAuthenticated() {
    return localStorage.getItem('token') !== null ? true : false;
  }

  details() {
    return this.http.get(`${environment.base}details`);
  }
}
