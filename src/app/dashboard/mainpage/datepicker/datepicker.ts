import { Component, OnInit,  EventEmitter, signal, output, effect, input, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule, MatEndDate } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateRangeFilter } from '../../../../model/purchase-filter.model';

function recentDateRange(days: number): DateRangeFilter {
  const endDate = new Date();
  endDate.setHours(0, 0, 0, 0);

  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - days + 1)

  return { startDate, endDate }
}



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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './datepicker.html',
  styleUrls: ['./datepicker.css']
})
export class Datepicker implements OnInit {

  readonly resetToken = input(0);
  readonly dateRangeSelected = output<DateRangeFilter | null>();
  readonly startDate = signal<Date | null>(null);
  readonly endDate = signal<Date | null>(null);
  readonly selectedPresetDays = signal<number | null>(null);
  readonly quickRanges = [
    { label: 'Today', days: 1 },
    { label: '2 Days', days: 2 },
    { label: '5 Days', days: 5 },
    { label: '7 Days', days: 7 },
    { label: '14 Days', days: 14 },
    { label: '30 Days', days: 30 },
    { label: '90 Days', days: 90 }
  ]

  private lastResetToken = 0;

 

  constructor() {
    effect(() => {
      const resetToken = this.resetToken();
      if (resetToken === this.lastResetToken)
        return

      this.lastResetToken = resetToken;
      this.startDate.set(null);
      this.endDate.set(null);
      this.selectedPresetDays.set(null)

    });
  }

  ngOnInit(): void {

    const range = recentDateRange(5);
    
    this.startDate.set(range.startDate);
    this.endDate.set(range.endDate);
    this.selectedPresetDays.set(5);
    this.emitDateRange();

  }

  selectQuickRange (days :number ) : void{
    const range = recentDateRange(days);
    this.startDate.set(range.startDate);
    this.endDate.set(range.endDate);
    this.selectedPresetDays.set(days)
    this.dateRangeSelected.emit(range);
  }

  onDateRange():void{
    this.selectedPresetDays.set(null);
    
    const startDate = this.startDate();
    const endDate = this.endDate();

    if (!startDate || !endDate || startDate > endDate){
      this.dateRangeSelected.emit(null);
      return
    }
    this.dateRangeSelected.emit({startDate,endDate})


  }

  private emitDateRange():void {
    const startDate= this.startDate();
    const endDate = this.endDate();

    if (startDate && endDate){
      this.dateRangeSelected.emit({startDate,endDate});
    }else {
      this.dateRangeSelected.emit(null)
    }


  }

}