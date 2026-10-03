import { Component, signal, ViewEncapsulation } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


interface complexity {
  value: string;
  viewValue: string;
}
interface type {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-tabsets',
  imports: [MatTabsModule, MatDividerModule, MatFormFieldModule, FormsModule, MatInputModule, MatSelectModule],
  templateUrl: './tabsets.html',
  styleUrl: './tabsets.css',
})
export class Tabsets {
  title: string = 'All Pending';

  complexities: complexity[] = [
    { value: 'all', viewValue: 'All' },
    { value: 'simple', viewValue: 'Simple' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'complex', viewValue: 'Complex' },
  ];

  types: type[] = [
    { value: 'manufacturers', viewValue: 'Manufacturers' },
    { value: 'others', viewValue: 'Others' },
    { value: 'Thirdpartydistributors', viewValue: 'Third-party Distributors' }
  ];

  onAddPurchase(): void {
   
  }

  
  protected tabs = signal(['One', 'Two', 'Three', 'Four', 'Five']);
  protected selectedTabIndex = signal(0);

  drop(event: CdkDragDrop<string[]>) {
    const prevtype = this.tabs()[this.selectedTabIndex()];
    moveItemInArray(this.tabs(), event.previousIndex, event.currentIndex);
    this.selectedTabIndex.set(this.tabs().indexOf(prevtype));

  }
}
