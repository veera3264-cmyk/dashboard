import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {
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

  ngOnInit() {

    this.response();
  }

  async response() {
    try {
      const response = await fetch("http://localhost:8080/api/users");
      if (!response.ok) {
        throw new Error("Request failed")
      }
      const data = await response.json();
      this.users = data;
    }
    catch (error) {
      console.error(error);
    }

  }

  async onLogin(): Promise<void> {
    this.errorMessage = '';
    this.successMessage='';

    if (this.EmailID.trim() === '' || this.Password.trim() === '') {
        this.errorMessage = "Please enter the EmailId and password"
      return;
    }
    const loginData = {
      email: this.EmailID,
      password: this.Password
    }
    try {
      const response = await fetch ("http://localhost:8080/api/users/login",
        {
          method: "POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        }
      );
      if(!response.ok){
        throw new Error('Login request failed');
      }
      const result = await response.json();

      if(result === 'SUCCESS'){
        this.successMessage = 'Login Succesful';
      }else {
        this.errorMessage = 'Invalid email or password'
      }
  }catch(error){
    console.error('Login error:', error)
    this.errorMessage = 'Unable to connect to server';
  }
}



  onSignUP(): void {
    this.errorMessage = 'enter the credentials correctly.';

    if (this.userName === '' || this.EmailID === '' || this.createPassword === '' || this.reEnterPassword === '') {
      this.errorMessage = 'Please fill the all the fields';
      return;
    }
    const user = this.users.map(

    );

    if (user) {
      this.errorMessage = 'Username or email already exists';
      return;
    }
  }

}