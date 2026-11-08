import { Component, signal } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-navbar',
  imports: [MatIconModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  EmailID: string = '';


  readonly isMenuOpen = signal(false);
  

  constructor(private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  this.authService.getCurrentUser()
    .subscribe({
      next: (response) => {

        this.EmailID = response.email;

        console.log(
          'Logged In User:',
          this.EmailID
        );
      },
      error: (error) => {

        console.error(
          'Unable to load current user',
          error
        );
      }
    });
}
  onLogout(): void {
    this.userService.logout();
    this.router.navigate(['']);
  }

  toggleMenu(): void {
    this.isMenuOpen.update(isOpen => !isOpen);
  }
}

