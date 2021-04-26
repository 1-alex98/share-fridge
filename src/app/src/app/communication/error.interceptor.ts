import {EventEmitter, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";
import {ErrorService} from "./error.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if(req.url.endsWith("/me")){
      return next.handle(req)
    }

    return next.handle(req)
      .pipe(
        tap(_ => {
          }
          , error => {
            this.errorService.currentError.emit(error);
          })
      );
  }
}
