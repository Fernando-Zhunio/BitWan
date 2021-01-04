import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Session } from '../clases/session';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private http:HttpClient,private s_storage:StorageService) { }

  store(description=null,image=null):Observable<any>{
    if(description==null && image == null) return EMPTY;
    let session:Session = this.s_storage.getCurrentSession();
    console.log(session);
    let body = new HttpParams()
    body = body.append('iduser',session.user.id)
    if(description!=null)body = body.append('description',description);
    if(image !=null)body = body.append('image',image);
    console.log(body);
    
    return this.http.post('public/posts/create',body.toString())
  }

  index():Observable<any>{
    let session:Session = this.s_storage.getCurrentSession();
    console.log(session);
    let body = new HttpParams()
    body = body.append('iduser',session.user.id)
    return this.http.post(`public/posts/viewbyiduser`,body.toString())
  }

  storeComment(description,idpost):Observable<any>{
    let session:Session = this.s_storage.getCurrentSession();
    console.log(session);
    let body = new HttpParams()
    body = body.append('iduser',session.user.id);
    body = body.append('description',description);
    body = body.append('idpost',idpost);
    return this.http.post('public/comments/create',body.toString())
  }
}
