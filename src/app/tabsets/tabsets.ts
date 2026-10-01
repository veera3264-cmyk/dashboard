import { Component, signal, ViewEncapsulation } from '@angular/core';
import {  CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-tabsets',
  imports: [MatTabsModule, MatDividerModule],
  templateUrl: './tabsets.html',
  styleUrl: './tabsets.css',
})
export class Tabsets {
  protected tabs = signal(['One', 'Two', 'Three', 'Four', 'Five']);
  protected selectedTabIndex = signal(0);

  drop(event: CdkDragDrop<string[]>) {
    const prevActive = this.tabs()[this.selectedTabIndex()];
    moveItemInArray(this.tabs(), event.previousIndex, event.currentIndex);
    this.selectedTabIndex.set(this.tabs().indexOf(prevActive));
  }
}
