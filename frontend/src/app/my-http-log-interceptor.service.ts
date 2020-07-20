import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

export class MyHttpLogInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.search('/login') === -1) {
      if (localStorage.getItem('token') !== null) {
        const token = `Bearer ${atob(localStorage.getItem('token'))}`;
        const customReq = req.clone({
          headers: new HttpHeaders().set('Authorization', token)
        });
        return next.handle(customReq).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              /*              console.log('interceptor success');
                            console.log('event--->>>', event);*/
            }
            return event;
          }),
          catchError((error: HttpErrorResponse) => {
              /*            console.log('interceptor error');
                          console.log(error);*/
              if (error.status === 401) {
                localStorage.removeItem('token');
              }
              return throwError(error);
            }
          ));
      } else {
        return next.handle(req);
      }
    } else {
      return next.handle(req);
    }
  }
}
