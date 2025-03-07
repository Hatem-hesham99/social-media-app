import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private httpClient: HttpClient ) {}

  sigUp(data:object):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/users/signup`,data)
  }
  sigIn(data:object):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/users/signin`,data)
  }

  changePassword(data:object):Observable<any>{
    return this.httpClient.patch(`${environment.baseUrl}/users/change-password`,data)
  }
  
  uploadProfilePhoto(data:any):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/users/upload-photo`,data)
  }

  getloggedUserData():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/profile-data`)
  }



}
