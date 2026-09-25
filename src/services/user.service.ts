import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private username: string = '';

  setUsername(username: string): void {
    this.username = username;
    localStorage.setItem('username', username);
  }

  getUsername(): string {
    return this.username || localStorage.getItem('userName') || '';
  }

  clearUser(): void {
    this.username = '';
    localStorage.removeItem('userName');
  }
}