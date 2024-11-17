import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MenusComponent} from '../menus/menu/menus.component'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MenusComponent
  ],
  template: '<h1>Iam Dashboard',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {

  constructor(private authService: AuthService){

  }

  ngOnInit() {
    if(!this.authService.isAuthenticated()){
    }
  }
 }
