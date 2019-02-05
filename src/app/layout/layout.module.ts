import 'jquery-slimscroll';
import 'messenger/build/js/messenger.js';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertModule, BsDropdownModule,
  TooltipModule   } from 'ngx-bootstrap';
import { WidgetModule } from './widget/widget.module';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
// import { GraficasComponent } from '../components/graficas/graficas.component';


@NgModule({
imports: [
  RouterModule,
  CommonModule,
  WidgetModule,
  TooltipModule.forRoot(),
  AlertModule.forRoot(),
  BsDropdownModule.forRoot(),
],
declarations: [
  SidebarComponent,
  NavbarComponent,
  FooterComponent,
  // GraficasComponent
],
exports: [
  SidebarComponent,
  NavbarComponent,
  FooterComponent,
  // GraficasComponent
]
})
export class LayoutModule { }
