import {EventEmitter, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  currentError: EventEmitter<any> = new EventEmitter<any>();

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req)
      .pipe(
        tap(_ => {
          }
          , error => {
            this.currentError.emit(error);
          })
      );
  }
}
