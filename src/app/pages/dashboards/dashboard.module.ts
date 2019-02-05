import 'jquery-slimscroll';
import 'messenger/build/js/messenger.js';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AlertModule, BsDropdownModule,
  TooltipModule, BsDatepickerModule  } from 'ngx-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule } from '@angular/forms';


import { DashboardsComponent } from './dashboards.component';
import { GraficaAntifraudeComponent } from './antifraude/antifraude.component';
import { GraficaEntidadBancariaComponent } from './entidad-bancaria/entidad-bancaria.component';
import { GraficaPasarelaComponent } from './pasarela/pasarela.component';
import { GraficaMontoRecargaComponent } from './monto-recarga/monto-recarga.component';
import { GraficaCostoCyberSourceComponent } from './costo-cybersource/costo-cybersource.component';
import { GraficaTipoTarjetaComponent } from './tipo-tarjeta/tipo-tarjeta.component';
import { GraficasComponent } from '../../components/graficas/graficas.component';
import { CardsTotalesComponent } from './cards-totals/cards-totals.component';

export const routes = [
  {path: '',  component: DashboardsComponent}

];

@NgModule({
imports: [
  CommonModule,
  FormsModule,
  TooltipModule.forRoot(),
  AlertModule.forRoot(),
  BsDropdownModule.forRoot(),
  DataTableModule,
  BsDatepickerModule.forRoot(),
  RouterModule.forChild(routes)
],
declarations: [
  GraficasComponent,
  CardsTotalesComponent,
  DashboardsComponent,
  GraficaAntifraudeComponent,
  GraficaEntidadBancariaComponent,
  GraficaPasarelaComponent,
  GraficaMontoRecargaComponent,
  GraficaCostoCyberSourceComponent,
  GraficaTipoTarjetaComponent
],
exports: []
})
export class DashboardModule {
  static routes = routes;
 }
