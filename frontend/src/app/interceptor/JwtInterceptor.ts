import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../auth/auth.model';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<Auth>, next: HttpHandler): Observable<HttpEvent<Auth>> {

        const token = localStorage.getItem('token');

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}
