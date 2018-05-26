import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorage} from '../services';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(private localStorage: LocalStorage) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorage.getItem('token');
    const Authorization = (token) ? `Basic ${token}` : '';
    req = req.clone({
      setHeaders: {
        'Content-Type': 'text/plain',
        Authorization
      },
      responseType: 'json',
      withCredentials: true
    });
    return next.handle(req);
  }
}
