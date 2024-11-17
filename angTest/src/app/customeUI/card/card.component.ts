import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone:true,
  template: `
    <div class="card" [hidden]="hidden">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #ccc;
      padding: 16px;
      margin: 8px;
      border-radius: 4px;
      box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class CardComponent {
  hidden = false;

  toggle() {
    this.hidden = !this.hidden;
  }
}
