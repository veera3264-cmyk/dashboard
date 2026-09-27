import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {  Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  imports: [MatIconModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  EmailID: string = '';

  constructor(private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.EmailID = sessionStorage.getItem('email') || '';
    
  }
  onLogout(): void{
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['']);
  }
}
import { MatIconModule } from '@angular/material/icon';
