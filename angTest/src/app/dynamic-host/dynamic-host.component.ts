/*

dynamic-host.component.ts


This file use when user want to load component dynamically on any event

  <!-- <app-dynamic-host #dynamicHost></app-dynamic-host> -->
*/

import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { StateComponent } from '../state/state.component';

@Component({
  standalone: true,
  selector: 'app-dynamic-host',
  template: '<div #dynamicContainer></div>'
})
export class DynamicHostComponent {
  @ViewChild('dynamicContainer', { read: ViewContainerRef }) dynamicContainer!: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  loadComponent(componentName: string) {
    this.dynamicContainer.clear(); // Clear the container before adding a new component

    let component: any;

    if (componentName === 'dashboard') {
      component = DashboardComponent;
    } else if (componentName === 'state') {
      component = StateComponent;
    }

    if (component) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      this.dynamicContainer.createComponent(componentFactory);
    }
  }
}
