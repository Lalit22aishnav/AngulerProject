import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-panel',
  standalone:true,
  imports: [CommonModule],
  template: `
    <div class="panel" [class.expanded]="expanded">
      <div class="panel-header" (click)="toggle()">
        <ng-content select="[panel-header]"></ng-content>
      </div>
      <div class="panel-body" *ngIf="expanded">
        <ng-content select="[panel-body]"></ng-content>
      </div>
    </div>
  `,
  styles: [`  
    .panel {
      border: 1px solid #ccc;
      margin-bottom: 8px;
      border-radius: 4px;
      overflow: hidden;
    }
    .panel-header {
      padding: 12px;
      background: #f7f7f7;
      cursor: pointer;
    }
    .panel-body {
      padding: 12px;
      background: #fff;
    }
    .panel.expanded .panel-header {
      font-weight: bold;
    }
  `],
})
export class PanelComponent {
  expanded = false;

  toggle() {
    this.expanded = !this.expanded;
  }
}
