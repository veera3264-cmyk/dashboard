import { Component } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Mainpage } from './mainpage/mainpage';
import { Footer } from './mainpage/footer/footer';


@Component({
  selector: 'app-dashboard',
  imports: [Navbar, RouterOutlet, Mainpage, Footer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
