import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export class MyHttpLogInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.search('/login') === -1) {
      if (localStorage.getItem('token') !== null) {
        const token = `Bearer ${atob(localStorage.getItem('token'))}`;
        const customReq = req.clone({
          headers: new HttpHeaders().set('Authorization', token)
        });
        return next.handle(customReq);
      } else {
        return next.handle(req);
      }
    } else {
      return next.handle(req);
    }
  }
}


