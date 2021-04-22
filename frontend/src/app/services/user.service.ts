import { Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getLogedUSer(): Observable<User>{
    return of(JSON.parse(localStorage.getItem('user')))
  }

}
