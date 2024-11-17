import { CommonModule } from '@angular/common';
import { Component, ContentChildren, QueryList, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  standalone:true,
  template: `
    <div class="dropdown">
      <button (click)="toggleMenu()">Toggle Menu</button>
      <div *ngIf="isOpen" class="dropdown-menu">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .dropdown {
      position: relative;
      display: inline-block;
    }
    .dropdown-menu {
      display: flex;
      flex-direction: column;
      position: absolute;
      background: white;
      border: 1px solid #ccc;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      min-width: 150px;
    }
    .dropdown-menu div {
      padding: 8px 12px;
      cursor: pointer;
    }
    .dropdown-menu > div:hover {
      background-color: orange;
    }
    .dropdown-menu div.disabled {
      color: #aaa;
      pointer-events: none;
    }
    .dropdown-menu div.selected {
      background-color: #007bff;
      color: white;
    }
  `],
  encapsulation:ViewEncapsulation.None
})
export class DropdownComponent {
  @ContentChildren('menuItem') items!: QueryList<ElementRef>;
  isOpen = false;
  selectedIndex: number | null = null;

  constructor(private renderer: Renderer2) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;

    // Optional: Log menu items for demonstration purposes
    this.items.forEach((item, index) =>
      console.log(`Menu item ${index}:`, item.nativeElement.innerText)
    );
  }

  selectItem(index: number) {
    if (this.isDisabled(index)) return; // Skip if item is disabled

    if (this.selectedIndex !== null) {
      const prevItem = this.items.toArray()[this.selectedIndex];
      this.renderer.removeClass(prevItem.nativeElement, 'selected');
    }

    this.selectedIndex = index;
    const currentItem = this.items.toArray()[index];
    this.renderer.addClass(currentItem.nativeElement, 'selected');
  }

  isDisabled(index: number): boolean {
    const item = this.items.toArray()[index];
    return item.nativeElement.classList.contains('disabled');
  }
}
