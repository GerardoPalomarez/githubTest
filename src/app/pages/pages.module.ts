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
import { GraficaAntifraudeComponent } from './dashboards/antifraude/antifraude.component';
import { GraficaEntidadBancariaComponent } from './dashboards/entidad-bancaria/entidad-bancaria.component';
import { GraficaPasarelaComponent } from './dashboards/pasarela/pasarela.component';
import { GraficaMontoRecargaComponent } from './dashboards/monto-recarga/monto-recarga.component';
import { GraficaCostoCyberSourceComponent } from './dashboards/costo-cybersource/costo-cybersource.component';
import { GraficaTipoTarjetaComponent } from './dashboards/tipo-tarjeta/tipo-tarjeta.component';
import { GraficasComponent } from '../components/graficas/graficas.component';
import { DashboardModule } from './dashboards/dashboard.module';


@NgModule({
  declarations: [
    // Autosize,
    PagesComponent,
    HomeComponent,
    PerfilComponent,
    // DashboardsComponent,
    // GraficasComponent,
    // GraficaAntifraudeComponent,
    // GraficaEntidadBancariaComponent,
    // GraficaPasarelaComponent,
    // GraficaMontoRecargaComponent,
    // GraficaCostoCyberSourceComponent,
    // GraficaTipoTarjetaComponent
],
imports: [
  LayoutModule,
  // DashboardModule,
  CommonModule,
  TooltipModule.forRoot(),
  AlertModule.forRoot(),
  BsDropdownModule.forRoot(),
  PAGES_ROUTES,
  FormsModule,
  DataTableModule,
  LoadingBarRouterModule,
  BsDatepickerModule.forRoot()
],
exports: [
]
})
export class PagesModule { }
