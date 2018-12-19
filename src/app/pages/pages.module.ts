import 'jquery-slimscroll';
import 'messenger/build/js/messenger.js';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AlertModule, BsDropdownModule,
  TooltipModule, BsDatepickerModule  } from 'ngx-bootstrap';
// import { Autosize } from 'ng-autosize';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { PAGES_ROUTES } from './pages.routes';

import { DashboardsComponent } from './dashboards/dashboards.component';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { PerfilComponent } from './perfil/perfil.component';
import { LayoutModule } from '../layout/layout.module';


@NgModule({
  declarations: [
    // Autosize,
    PagesComponent,
    HomeComponent,
    PerfilComponent,
    DashboardsComponent,
],
imports: [
  LayoutModule,
  CommonModule,
  TooltipModule.forRoot(),
  AlertModule.forRoot(),
  BsDropdownModule.forRoot(),
  PAGES_ROUTES,
  FormsModule,
  DataTableModule,
  LoadingBarRouterModule,
  BsDatepickerModule.forRoot()
]
})
export class PagesModule { }
