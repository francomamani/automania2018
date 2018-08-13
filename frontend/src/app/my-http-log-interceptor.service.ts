import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent, HttpResponse, HttpErrorResponse, HttpClient
} from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class MyHttpLogInterceptorService implements HttpInterceptor {
    environment = environment;
    constructor(private http: HttpClient) {}
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next
            .handle(request)
            .do((ev: HttpEvent<any>) => {
                if (ev instanceof HttpResponse) {
                    console.log('processing response ', ev);
                }
            })
            .catch( response => {
                if (response instanceof HttpErrorResponse ) {
/*                    this.http
                        .post( this.environment.base + 'refresh-token-expired', {
                            token : localStorage.getItem('token')
                        }, {
                            headers: {
                                'Content-Type' : 'application/json'
                            }
                        })
                        .subscribe(res => {
                            console.log(res);
                        });*/
                    /*localStorage.removeItem('token');*/
                    /*if (response.error.autenticado === false) {
                    } else {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        alert('Cerrando sesión, por favor vuelva a autenticarse');
                        location.reload();
                        console.log('Processing http error ', response);
                    }*/
                }
                return Observable.throw(response);
            });
    }
}


