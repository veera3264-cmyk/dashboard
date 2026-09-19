import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username : string ='';
  password : string ='';
  currentStep: 'login' | 'signup' = 'login';
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';


    constructor(private router: Router) {}

  onLogin(){

  }
}