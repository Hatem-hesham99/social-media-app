import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { IAllPosts } from '../../interfaces/iall-posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient:HttpClient) { }

  createPost(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/posts`,data)
  }

  
  getAllPosts(page:number=1):Observable<any>{
    return this.httpClient.get<IAllPosts>(`${environment.baseUrl}/posts?page=${page}&limit=5`)
  }


  getMyPosts():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/664bcf3e33da217c4af21f00/posts`)
  }


  getSinglePosts(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/posts/${id}`)
  }


  updatePosts(id:string ,data:any ):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/posts/${id}`,data)
  }


  deletPosts(id:string  ):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/posts/${id}`)
  }

  

}
