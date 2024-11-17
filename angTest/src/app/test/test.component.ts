import { Component, QueryList, ViewChildren } from '@angular/core';
import { AccordionComponent } from '../customeUI/accordion/accordion.component';
import { PanelComponent } from '../customeUI/panel/panel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [PanelComponent, CommonModule],
  template: `
            <app-panel>
                  <div panel-header>Panel 1 Header</div>
                  <div panel-body>Panel 1 Body</div>
            </app-panel>
  `
})
export class TestComponent {

}
