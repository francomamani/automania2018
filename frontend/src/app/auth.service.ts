import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment.prod';
@Injectable()
export class AuthService {

    headers: any = null;
    constructor(private http: HttpClient) {
        this.headers = {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        };
    }

    authenticate(form) {
        return this.http.post( environment.base  + 'authenticate', form);
    }
    register(form) {
        return this.http.post(environment.base + 'register', form);
    }
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
/*        return this.http.get(environment.base + 'logout', {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        });*/
    }
    isAuthenticated() {
        return localStorage.getItem('token') !== null ? true : false;
    }
}