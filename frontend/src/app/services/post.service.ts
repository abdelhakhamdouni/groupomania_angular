import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import Post from '../models/Post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Constantes from './constantes.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(protected http: HttpClient, protected constantes: Constantes) { }

  public getPost(): Observable<Post[]> {
    return this.http.get('http://localhost:8000/api/posts', {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.constantes.gettoken()
      })
    }).pipe(
      map(
        (jsonArray: Object[]) => jsonArray.map(jsonItem => Post.fromJson(jsonItem))
      )
    )
  }
  public savePost(formData: FormData): Observable<any>{
    return this.http.post('http://localhost:8000/api/posts', formData, {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.constantes.gettoken()
      })
    }).pipe(
      res=> res
    )
  }

}
