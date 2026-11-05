import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  setUser(email: string, token: string): void {
    sessionStorage.setItem('EmailID', email);
    sessionStorage.setItem('token', token);
  }

  getEmailID(): string {
    return sessionStorage.getItem('EmailID') || '';
  }

  getToken(): string {
    return sessionStorage.getItem('token') || '';
  }

  logout(): void {
    sessionStorage.clear();
  }
}