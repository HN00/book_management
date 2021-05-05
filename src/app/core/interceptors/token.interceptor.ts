import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  excludedUrls: string[] = [
    'auths/login'
  ];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.isValidRequestForInterceptor(req.url)) {
      const userToken = localStorage.getItem('token');
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${userToken}`)
      });
      return next.handle(modifiedReq);
    } else {
      return next.handle(req);
    }
  }

  private isValidRequestForInterceptor(requestUrl: string): boolean {
    const positionIndicator = 'api/';
    const position = requestUrl.indexOf(positionIndicator);
    if (position > 0) {
      const destination: string = requestUrl.substr(position + positionIndicator.length);
      for (const address of this.excludedUrls) {
        if (new RegExp(address).test(destination)) {
          return false;
        }
      }
    }
    return true;
  }
}
