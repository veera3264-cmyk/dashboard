import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private EmailID: string = '';

  setEmailID(email: string): void {
    this.EmailID = email;
    sessionStorage.setItem('EmailID', email);
  }

  getEmailID(): string {
    return this.EmailID || sessionStorage.getItem('email') || '';
  }

  clearUser(): void {
    this.EmailID = '';
    sessionStorage.removeItem('email');
  }
}