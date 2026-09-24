import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
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


  constructor(private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router) { }


  users: Array<{ username: string; email: string; password: string }> = [];

  ngOnInit() {

  }

  onLogin(): void {
    this.errorMessage = '';
    this.successMessage = '';


    if (!this.EmailID.trim() || !this.Password.trim()) {
      this.errorMessage = 'Please enter the Email ID and password.';
      this.cdr.detectChanges();
      return;
    }

    const loginData = {
      email: this.EmailID,
      password: this.Password
    };

    this.http.post<any>(
      'http://localhost:8080/api/login',
      loginData
    ).subscribe({
      next: (result) => {
        console.log('Login response:', result);

        if (result.status === 'SUCCESS') {
          this.successMessage = 'Login Successful';
           this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = result.message || 'Invalid email or password.';
        }
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Login error:', error);

        this.errorMessage =
          error.error?.message || 'Unable to connect to server.';
      }
    });
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.EmailID.trim())) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }
    if (this.createPassword !== this.reEnterPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
    if (this.createPassword.length <= 8) {
      this.errorMessage = 'Password must contain more than 8 characters.';
      return;
    }

    if (!/[A-Z]/.test(this.createPassword)) {
      this.errorMessage = 'Password must contain at least one capital letter.';
      return;
    }

    if (!/[0-9]/.test(this.createPassword)) {
      this.errorMessage = 'Password must contain at least one numeric character.';
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-]/.test(this.createPassword)) {
      this.errorMessage = 'Password must contain at least one special character.';
      return;
    }

    const signUpData = {
      username: this.userName.trim(),
      email: this.EmailID.trim(),
      password: this.createPassword
    };

    this.http.post<any>(
      'http://localhost:8080/api/signup',
      signUpData
    ).subscribe({
      next: (result) => {
        console.log('Signup response:', result);

        if (result.status === 'FAILED') {
          this.errorMessage = 'Account already exists with this email';
        } else {
          this.successMessage = 'Account Created Successfully';
        }

        if (result.status === 'SUCCESS') {
          this.currentStep = 'login';
          this.EmailID = '';
          this.Password = '';

          this.userName = '';
          this.createPassword = '';
          this.reEnterPassword = '';


        }
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Signup error:', error);
        this.errorMessage = error.error?.message || 'Unable to connect to server.';
      }
    });



  }

}









