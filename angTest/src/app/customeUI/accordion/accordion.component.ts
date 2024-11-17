import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'app-accordion',
  standalone:true,
  template: `
    <button (click)="toggleAll()">Toggle All</button>
    <ng-content></ng-content>
  `
})
export class AccordionComponent implements AfterContentInit {
  @ContentChildren(PanelComponent) panels!: QueryList<PanelComponent>;

  ngAfterContentInit() {
    console.log('Projected panels:', this.panels);
  }

  toggleAll() {
    const shouldExpand = !this.panels.first?.expanded; // Check the state of the first panel
    this.panels.forEach(panel => (panel.expanded = shouldExpand));
  }
}
