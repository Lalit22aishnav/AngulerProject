import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { menuList } from '../menuList'
import { Menu, menuService } from '../menuClass'
import { ChildMenuComponent } from '../childMenu/childMenu.component'
import { SharedService } from '../../shared/services/shared.service'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [CommonModule, ChildMenuComponent,],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.css',
})
export class MenusComponent {

  menuObj: menuService = new menuService();
  finalMenu: Menu[] = this.menuObj.buildMenuTree(menuList);
  // Observable from sharedService
  data$: Observable<any>;

  constructor(private sharedService: SharedService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.data$ = this.sharedService.data$; // Assign the observable
  }

  logout() {
    this.authService.logout();
    this.sharedService.setData({ isOpen: false });
    this.router.navigate(['/login']);
  }
}