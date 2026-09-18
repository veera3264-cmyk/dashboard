import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  currentStep: 'login' | 'signip' = 'login';

  onSubmit(): void {
    console.log(this.username, this.password);
  }
}