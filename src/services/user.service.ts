import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  sub: string;
  role: string;
  exp: number;
  iat: number;
}

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

  getLoggedInEmail(): string {

    const token = this.getToken();

    if (!token) {
      return '';
    }

    try {
      const decoded =
        jwtDecode<JwtPayload>(token);

      return decoded.sub;
    } catch {
      return '';
    }
  }

  logout(): void {
    sessionStorage.clear();
  }
}