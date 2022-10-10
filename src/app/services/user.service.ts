import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILogin } from '../models/ILogin';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  login(data: ILogin): Observable<string> {
    return this.httpClient.post('http://localhost:7262/api/User/Login', data, {
      responseType: 'text',
    });
  }
  signup(data: any): Observable<string> {
    return this.httpClient.post('http://localhost:7262/api/User/Signup', data, {
      responseType: 'text',
    });
  }
}
