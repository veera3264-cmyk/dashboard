import { Component } from '@angular/core';
import { Datepicker } from './datepicker/datepicker';
import { SearchCriteria } from './searchcreteria/searchcreteria';
import { Tabsets } from '../../tabsets/tabsets';
import { Table } from '../../table/table';





@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [Datepicker, SearchCriteria, Tabsets, Table],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.css',
})

export class Mainpage {
  

}
