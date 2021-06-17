import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(user:any): Observable<any>{
    console.log('service '+ user)
    return this.http.post(BASE_URL + 'auth/signup', {
      username :user.name,
      email: user.password,
      password: user.password,
    })
  }
}
