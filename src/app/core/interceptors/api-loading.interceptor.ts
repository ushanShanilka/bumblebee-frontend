import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {ApiLoadingService} from "../../modules/shared/api-loading/api-loading.service";

@Injectable()
export class ApiLoadingInterceptor implements HttpInterceptor {


  constructor(public apiLoadingService: ApiLoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.apiLoadingService.show();
    return next.handle(request).pipe(
      finalize(() => this.apiLoadingService.hide())
    );
  }
}
