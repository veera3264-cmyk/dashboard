import { Component } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Mainpage } from '../mainpage/mainpage';

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, RouterOutlet, Mainpage],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
