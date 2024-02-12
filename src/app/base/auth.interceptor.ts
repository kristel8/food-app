import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiKey = environment.apiKey;

    if (!apiKey) return next.handle(req);

    const headers = req.clone({
      headers: req.headers
        .set('x-api-key', `${apiKey}`)
    });

    return next.handle(headers);
  }
}
