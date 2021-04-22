import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import User from '../models/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getLogin(): Observable<boolean>{
    return of(localStorage.getItem('loged') != null)
  }

  public login(email:string, password:string): Observable<any> {
    return this.http.post('http://localhost:8000/api/auth/login', {
      email, 
      password
    })
  }

}
