import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { PurchaseStatus } from '../../../models/purchaseStatus.model';

interface Complexity {
  value: string;
  viewValue: string;
}

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-tabsets',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTabsModule,
    MatDividerModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './tabsets.html',
  styleUrl: './tabsets.css'
})
export class Tabsets {
  readonly resetToken = input(0);
  readonly selectedPurchaseCount = input(0);

  readonly possibleDuplicatesChanged = output<boolean>();
  readonly statusChanged = output<PurchaseStatus>();

  readonly showPossibleDuplicates = signal(false);
  readonly selectedStatus = signal<PurchaseStatus>('all');
  readonly selectedTabIndex = signal(0);

  private lastResetToken = 0;

  title = 'All';

  readonly complexities: Complexity[] = [
    { value: 'all', viewValue: 'All' },
    { value: 'simple', viewValue: 'Simple' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'complex', viewValue: 'Complex' }
  ];

  readonly types: Type[] = [
    { value: 'all', viewValue: 'All' },
    { value: 'manufacturers', viewValue: 'Manufacturers' },
    { value: 'others', viewValue: 'Others' },
    { value: 'Thirdpartydistributors', viewValue: 'Third-party Distributors' }
  ];

  readonly purchaseTabs: ReadonlyArray<{
  label: string;
  value: PurchaseStatus;
}> = [
  { label: 'All', value: 'all' },
   { label: 'Pending', value: 'pending' },
  { label: 'Deliveries', value: 'deliveries' },
  { label: 'Invoices', value: 'invoices' },
  { label: 'PartiallyCompleted', value: 'partiallyCompleted' },
  { label: 'Completed', value: 'completed' },
  { label: 'Rescan', value: 'rescan' },
   { label: 'Ineligible', value: 'ineligible' }

];

  constructor() {
    effect(() => {
      const resetToken = this.resetToken();

      if (resetToken !== this.lastResetToken) {
        this.lastResetToken = resetToken;

        this.showPossibleDuplicates.set(false);
        this.selectedStatus.set('all');
        this.selectedTabIndex.set(0);
        this.title = 'All';
      }
    });
  }

  onTabChanged(index: number): void {
    const selectedTab = this.purchaseTabs[index];
    if (!selectedTab) {
      return;
    }

    this.selectedTabIndex.set(index);
    this.selectedStatus.set(selectedTab.value);
    this.title = selectedTab.label;

    this.statusChanged.emit(selectedTab.value);
  }

  onPossibleDuplicatesChange(value: boolean): void {
    this.showPossibleDuplicates.set(value);
    this.possibleDuplicatesChanged.emit(value);
  }

  onAddPurchase(): void {
    // Add purchase logic
  }
}