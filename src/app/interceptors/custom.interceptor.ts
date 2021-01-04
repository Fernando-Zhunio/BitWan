import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SwalService } from '../servicios/swal.service';
import { catchError, map, tap } from "rxjs/operators";
import { StorageService } from '../servicios/storage.service';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor(private route:Router,private s_storage:StorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let headers = null;
    let body = request.body +`&applicantcode=749166`;
    headers = new HttpHeaders({
      "accept": "application/json",
      // "Content-Type": "application/json",
      "Access-Control-Allow-Origin":"*",
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    if (this.s_storage.isAuthenticated()) {
      // headers = this.createHeader();
    const token = this.s_storage.getCurrentToken();
       body = body +`&token=${token}` 
    } 
    console.log(request.body);
    // ('applicantcode','749166');
    
    const newResquest = request.clone({
      headers,
      body
      // params
    });

    return next.handle(newResquest).pipe(
      tap((r:any)=>{
        if(r.body?.code && r.body?.code != 200){
        console.log(r.body?.msg);
        SwalService.swalToast(
          r.body.msg,
          "warning"
        );
        }
        return 2;
      }),
      catchError((err) => {
        switch (err.status) {
          case 401:
            if(localStorage.getItem('token'))localStorage.removeItem('token');
          this.route.navigate(['/login'])

            SwalService.swalToast(
              "Error de credenciales comprueben que sean correctas",
              "warning"
            );
            break;
          case 403:
            SwalService.swalToast(
              "No posee los permisos necesarios para este contenido",
              "warning"
            );
            break;
          case 404:
            SwalService.swalToast("El servidor no pudo encontrar el contenido solicitado.", "warning");
            break;
          case 500:
            SwalService.swalToast("Error del servidor, intentolo otra vez", "warning");
            break;
          default:
            SwalService.swalToast("Error desconocido, intentolo otra vez", "warning");
            break;
        }
        return throwError(err);
      })
    );
  }

  createHeader() {
    const token = this.s_storage.getCurrentToken();
    const Header = new HttpHeaders({
      'accept': "application/json",
      // "Content-Type": "application/json",
      // 'Authorization': "Bearer " + token,
      'Content-Type': 'application/x-www-form-urlencoded'

    });
    return Header;
  }
}
