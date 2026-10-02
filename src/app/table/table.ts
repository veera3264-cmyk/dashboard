import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role'];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    const dummyData: UserData[] = [
      { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' },
      { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: 'User' },
      { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Moderator' },
    ];

    // Initialize data source
    this.dataSource = new MatTableDataSource(dummyData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
