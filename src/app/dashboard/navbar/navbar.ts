import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  EmailID: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.EmailID = sessionStorage.getItem('email') || '';
    
  }
}