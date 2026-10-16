import { Component } from '@angular/core';
import { Datepicker } from './datepicker/datepicker';
import { SearchCriteria } from './searchcreteria/searchcreteria';
import { Tabsets } from './tabsets/tabsets';
import { Table } from './table/table';

function parsePurchaseDate(value: string | null): Date | null {
  if (!value) {
    return null;
  }
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:$|T)/.exec(value);
  if (!match) {
    return null
  }

  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(year, month - 1, day)

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDay() !== day
  ) {
    return null

  }
  return date
}



@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [Datepicker, SearchCriteria, Tabsets, Table],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.css',
})

export class Mainpage {


}
