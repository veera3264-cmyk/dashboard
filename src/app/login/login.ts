import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  userName: string = '';
  createPassword: string = '';
  reEnterPassword: string = '';
  EmailID: string = '';
  Password: string = '';
  currentStep: 'login' | 'signup' = 'login';
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';


  // constructor(private router: Router) { }

  users: Array<{ username: string; email: string; password: string }> = [];



  async onLogin(): Promise<void> {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.EmailID.trim() === '' || this.Password.trim() === '') {
      this.errorMessage = "Please enter the EmailId and password"
      return;
    }

    const loginData = {
      email: this.EmailID,
      password: this.Password
    }
    try {
      const response = await fetch("http://localhost:8080/api/users/login",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        }

      );

      if (!response.ok) {
        throw new Error('Login request failed');
      }
      const result = await response.json();
      console.log(result);

      if (result.status ==='SUCCESS') {
        this.successMessage = 'Login Succesful';
        console.log(this.successMessage);
      } else {
        this.errorMessage = 'Invalid email or password'
      }
    } catch (error) {
      console.error('Login error:', error)
      this.errorMessage = 'Unable to connect to server';
    }
    
  }

  async onSignUP(): Promise<void> {

    this.errorMessage = '';
    this.successMessage = '';

    if (
      this.userName.trim() === '' ||
      this.EmailID.trim() === '' ||
      this.createPassword.trim() === '' ||
      this.reEnterPassword.trim() === ''
    ) {
      this.errorMessage = 'Please fill all the fields.';
      return;
    }

    if (this.createPassword !== this.reEnterPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const signUpData = {
      username: this.userName.trim(),
      email: this.EmailID.trim(),
      password: this.createPassword
    };

    try {

      const response = await fetch(
        'http://localhost:8080/api/users/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(signUpData)
        }
      );

      const data = await response.json();
      console.log(data)

      if (data.status === 'FAILED') {
        this.errorMessage = 'Account already exists with this email'
        return;
      }else {
        this.successMessage = 'Account Created Successfully'
      }

      

    } catch (error) {

      console.error('Signup error:', error);
      this.errorMessage = 'Unable to connect to the server';

    }
  }
}







