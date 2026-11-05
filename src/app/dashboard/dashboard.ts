import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Mainpage } from './mainpage/mainpage';
import { Footer } from './mainpage/footer/footer';
import { AssignmentService } from '../../services/assignement.service';

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, RouterOutlet, Mainpage, Footer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private readonly assignmentService = inject(AssignmentService);

  ngOnInit(): void {
    this.assignmentService.triggerAssignment().subscribe({
      next: purchases => {
        console.log('Purchases assigned', purchases);
      },
      error: error => {
        console.error('Could not trigger purchase assignment.', error);
      }
    });
  }
}
