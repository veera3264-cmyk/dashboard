import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  userName: string = '';
  createPassword: string = '';
  reEnterPassword: string = '';
  EmailID: string = '';
  Password: string = '';

  currentStep: 'login' | 'signup' = 'login';

  isLoading: boolean = false;

  errorMessage: string = '';
  successMessage: string = '';

  showPassword: boolean = false;
  showCreatePassword: boolean = false;
  showReEnterPassword: boolean = false;

  constructor(
    @Inject(LoginService) private loginService: LoginService,
    @Inject(UserService) private userService: UserService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  showSignup() {

    this.currentStep = 'signup';

    this.EmailID = '';
    this.Password = '';

    this.errorMessage = '';
    this.successMessage = '';
  }

  showLogin() {

    this.currentStep = 'login';

    this.userName = '';
    this.EmailID = '';
    this.createPassword = '';
    this.reEnterPassword = '';

    this.errorMessage = '';
    this.successMessage = '';
  }

  onLogin(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (!this.EmailID.trim() || !this.Password.trim()) {

      this.errorMessage =
        'Please enter the Email ID and password.';
      return;
    }

    const loginData = {

      email: this.EmailID.trim(),
      password: this.Password
    };

    this.loginService.login(loginData)
      .subscribe({

        next: (result: any) => {

          console.log(result);

          if (result.status === 'SUCCESS') {

            this.successMessage = result.message;

            localStorage.setItem(
              'userName',
              result.username
            );

            this.router.navigate(['/dashboard']);

          } else {

            this.errorMessage =
              result.message || 'Invalid Credentials';
          }

          this.cdr.detectChanges();
        },

        error: (error: any) => {

          console.error(error);

          this.errorMessage =
            error.error?.message ||
            'Unable to connect to server';
        }
      });
  }

  onSignUP(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (
      this.userName.trim() === '' ||
      this.EmailID.trim() === '' ||
      this.createPassword.trim() === '' ||
      this.reEnterPassword.trim() === ''
    ) {

      this.errorMessage =
        'Please fill all the fields.';
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(this.EmailID.trim())
    ) {

      this.errorMessage =
        'Please enter a valid email address.';
      return;
    }

    if (
      this.createPassword !==
      this.reEnterPassword
    ) {

      this.errorMessage =
        'Passwords do not match.';
      return;
    }

    if (this.createPassword.length <= 8) {

      this.errorMessage =
        'Password must contain more than 8 characters.';
      return;
    }

    if (!/[A-Z]/.test(this.createPassword)) {

      this.errorMessage =
        'Password must contain at least one capital letter.';
      return;
    }

    if (!/[0-9]/.test(this.createPassword)) {

      this.errorMessage =
        'Password must contain at least one numeric character.';
      return;
    }

    if (
      !/[!@#$%^&*(),.?":{}|<>_\-]/
        .test(this.createPassword)
    ) {

      this.errorMessage =
        'Password must contain at least one special character.';
      return;
    }

    const signUpData = {

      username: this.userName.trim(),
      email: this.EmailID.trim(),
      password: this.createPassword
    };

    this.loginService.signup(signUpData)
      .subscribe({

        next: (result: any) => {

          console.log(result);

          if (result.status === 'FAILED') {

            this.errorMessage =
              result.message;
            return;
          }

          this.successMessage =
            result.message;

          this.userName = '';
          this.EmailID = '';
          this.createPassword = '';
          this.reEnterPassword = '';

          this.currentStep = 'login';

          this.cdr.detectChanges();
        },

        error: (error:any) => {

          console.error(error);

          this.errorMessage =
            error.error?.message ||
            'Unable to connect to server';
        }
      });
  }
}
