import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginAndRegisterService {

  constructor(public http:HttpClient) { }

  server:string = environment.server_api;
  public login(params):Observable<any>{
    const body = new HttpParams()
    .set('email', params.email)
    .set('password', params.password)
    // .set('applicantcode','749166')
    return this.http.post(`${this.server}login`,body.toString());
  }

  public register(params):Observable<any>{
    // form_register: FormGroup = new FormGroup({
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('', [Validators.required]),
    //   nickname: new FormControl('', [Validators.required]),
    //   fullname: new FormControl('', [Validators.required]),
    //   image: new FormControl(null),
    //   birthdate: new FormControl(null),
      // applicantcode:new FormControl(749166)
    // });
    const body = new HttpParams()
    .set('email', params.email)
    .set('password', params.password)
    .set('nickname',params.nickname)
    .set('fullname',params.fullname)
    // .set('birthdate',params.nickname)
    // .set('image',params.image)
    if(params.birthdate != null) body.append('image',params.image)
    if(params.image != null) body.append('birthdate',params.nickname)
    return this.http.post(`${this.server}users/create`,body.toString())
  }
}
