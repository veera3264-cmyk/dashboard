import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDatepickerModule
} from '@angular/material/datepicker';
import {
  MatNativeDateModule
} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './datepicker.html',
  styleUrls: ['./datepicker.css']
})
export class Datepicker {

  startDate!: Date;
  endDate!: Date;

  constructor() {
    this.startDate = new Date();

    this.endDate = new Date();
    this.endDate.setDate(this.startDate.getDate() + 7);
  }
}