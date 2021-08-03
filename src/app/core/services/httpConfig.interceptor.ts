import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthServiceService } from './auth/auth-service.service';
import { EMPTY } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthServiceService, private toastrService: ToastrService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // req = req.clone({ headers: req.headers.set('Content-Type', "application/json") });
    // req = req.clone({ headers: req.headers.set("Accept", "application/json;charset=utf-8") })
    // req = req.clone({ headers: req.headers.set("Accept-Charset", "charset=utf-8") })
    // req = req.clone({ headers: req.headers.set("Access-Control-Allow-Origin", "*") })
    // req = req.clone({ headers: req.headers.set("X-Tenant-ID", "tenant_default") })
    // req = req.clone({ headers: req.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS") })
    // req = req.clone({ headers: req.headers.set("Access-Control-Allow-Headers", "Origin, Content-Type, X-Tenant-ID, Content-Type") })
    if (this._auth.getToken)
      req = req.clone({ headers: req.headers.set("Authorization", this._auth.getToken) })
    
    req = req.clone({ body: req.body });

    console.log("Request Body", JSON.stringify(req.body))
    console.log("Request Params", req.urlWithParams)
    if (!req.urlWithParams)
      return EMPTY
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        console.log("API Data", event);

        return event
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("HTTP ERROR", error);
        if (error.error){
          if(typeof error.error == 'string'){
            this.toastrService.error(error.error)
          }else{
            this.toastrService.error(error.error.message || "Internal Server error!");
          }
        }
        else
          this.toastrService.error(error.error.message || "Sorry!, Try again later");

        if(error.status === 190){
          this._auth.logout()
          localStorage.removeItem('driverData')
          localStorage.removeItem('adminData')
        }
        return throwError(error)
      })
    );
  }

}
