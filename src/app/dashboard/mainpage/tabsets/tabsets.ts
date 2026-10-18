import { Component, effect, input, output, signal, ViewEncapsulation } from '@angular/core';
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

  readonly resetToken = input(0);
  readonly possibleDuplicatesChanged = output<boolean>();
  readonly showPossibleDuplicates = signal(false);
  private lastResetToken = 0;
  
  title: string = 'All Pending';

  complexities: complexity[] = [
    { value: 'all', viewValue: 'All' },
    { value: 'simple', viewValue: 'Simple' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'complex', viewValue: 'Complex' },
  ];

  types: type[] = [
    { value: 'all', viewValue: 'All' },
    { value: 'manufacturers', viewValue: 'Manufacturers' },
    { value: 'others', viewValue: 'Others' },
    { value: 'Thirdpartydistributors', viewValue: 'Third-party Distributors' }
  ];

  onAddPurchase(): void {
   
  }
  onPossibleDuplicatesChange(value: boolean): void {
    this.showPossibleDuplicates.set(value);
    this.possibleDuplicatesChanged.emit(value);
  }

   constructor() {
    effect(() => {
      const resetToken = this.resetToken();
      if (resetToken !== this.lastResetToken) {
        this.lastResetToken = resetToken;
        this.showPossibleDuplicates.set(false);
      }
    });
  }
 

 

  }

