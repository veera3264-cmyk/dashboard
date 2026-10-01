import { Component } from '@angular/core';
import { Datepicker } from './datepicker/datepicker';




@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [Datepicker],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.css',
})
export class Mainpage {

}
