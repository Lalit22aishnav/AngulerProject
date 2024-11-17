import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from './shared/model/shared.module';
import { MenusComponent } from './menus/menu/menus.component'
import { SharedService } from './shared/services/shared.service';
import { AuthService } from './services/auth.service';
import { strict } from 'assert';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule, MenusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  title = 'Angler Route';
  toggleMenu: boolean = false;
  userAuth: any;
  data$: Observable<any>; // Observable from sharedService

  constructor(private sharedService: SharedService, private authService: AuthService) { 
    this.data$ = this.authService.token$; // Assign the observable
  }

  ngOnInit() {
    console.log('AppComponent loaded');
    /* After Click On Menu Need To Set Toggle Button Property To False */
    this.sharedService.data$.subscribe(state => {
      this.toggleMenu = state["isOpen"];
    });

    if(!this.authService.isAuthenticated()){
      this.authService.setData("");
    }

    this.authService.token$.subscribe((tokenSubject) => {
      this.userAuth = (tokenSubject != "") ? true : false
    });
  }

  menuToggle() {
    /* Set The Toggle Property */
    this.toggleMenu = !this.toggleMenu
    /* Set The Toggle Property In sharedService also for Toggle Menu Hide*/
    this.sharedService.setData({ isOpen: this.toggleMenu });
  }

}
