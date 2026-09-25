import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'http://localhost:8080/api/login';
  private signupUrl = 'http://localhost:8080/api/signup';

  constructor(private http: HttpClient) {}

  login(loginData: any): Observable<any> {
    return this.http.post<any>(
      this.loginUrl,
      loginData
    );
  }

  signup(signupData: any): Observable<any> {
    return this.http.post<any>(
      this.signupUrl,
      signupData
    );
  }
}