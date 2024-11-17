// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';


@NgModule({
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  exports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive]
})
export class SharedModule {}
