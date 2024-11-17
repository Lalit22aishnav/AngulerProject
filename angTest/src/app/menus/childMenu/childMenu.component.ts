import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Menu } from '../menuClass';
import { RouterLink } from '@angular/router';
import {SharedService} from '../../shared/services/shared.service'

@Component({
  selector: 'app-child-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './childMenu.component.html',
  styleUrl: './childMenu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildMenuComponent {
  @Input() menu!: Menu;

  constructor(private sharedService:SharedService){}

  menuOpenClose(menu: Menu) {
    menu.isOpen = !menu.isOpen;
  }

  closeMenu(menu: Menu){
    this.sharedService.setData({ isOpen: false });  
  }

}
