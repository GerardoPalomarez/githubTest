import { Component, OnInit, AfterViewInit, TemplateRef, EventEmitter, ViewChild} from '@angular/core';
import { BsDatepickerConfig, BsLocaleService} from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);

import { DashboardService } from '../../services/dashboard.service';
import { GraficaTipoTarjetaComponent } from './tipo-tarjeta/tipo-tarjeta.component';
import { GraficaAntifraudeComponent } from './antifraude/antifraude.component';
import { GraficaPasarelaComponent } from './pasarela/pasarela.component';
import { GraficaEntidadBancariaComponent } from './entidad-bancaria/entidad-bancaria.component';
import { GraficaCostoCyberSourceComponent } from './costo-cybersource/costo-cybersource.component';
import { GraficaMontoRecargaComponent } from './monto-recarga/monto-recarga.component';

@Component({
  selector: 'app-dashboards',
  styleUrls: ['./dashboards.style.scss'],
  templateUrl: './dashboards.template.html'
})

export class DashboardsComponent implements OnInit {
  @ViewChild(GraficaAntifraudeComponent) antifraude: any;
  @ViewChild(GraficaPasarelaComponent) pasarela: any;
  @ViewChild(GraficaEntidadBancariaComponent) entidadbancaria: any;
  @ViewChild(GraficaCostoCyberSourceComponent) costocybersource: any;
  @ViewChild(GraficaMontoRecargaComponent) montorecarga: any;
  @ViewChild(GraficaTipoTarjetaComponent) tipotarjeta: any;
  bsConfig: Partial<BsDatepickerConfig>;
  public fecha_actual: any;
  public fecha_inicio: any;
  public time = ' 00:00:00';
  public time_end = ' 23:59:59';
  public maxDate: any;
  public minDate: any;
  public especial_fecha_actual: any; // Fecha final
  public especial_fecha_inicio: any; // Fecha inicio
  public isLoading: boolean;
  public isValidData: boolean;
  public infoDates: boolean;
  public detalleTransacciones: any;
  private timer: any;

  constructor( private router: Router, private dashboardService: DashboardService , private bsLocale : BsLocaleService) {
    this.bsLocale.use('es');
    this.bsConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        dateInputFormat: 'YYYY-MM-DD'
      }
    );

    this.maxDate = new Date();
    this.minDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());
    this.minDate.setDate(this.minDate.getDate() - 90);

  }

  ngOnInit() {
    this.isLoading = true; // Carga el loading al iniciar
    this.isValidData = false; // Valida si la data es correcta al iniciar

    this.timer = setTimeout(() => {
      this.isLoading = this.antifraude.isLoading && this.pasarela.isLoading && this.entidadbancaria.isLoading
        && this.costocybersource.isLoading && this.montorecarga.isLoading &&  this.tipotarjeta.isLoading;

      this.isValidData = this.antifraude.isValidData &&  this.pasarela.isValidData &&
      this.entidadbancaria.isValidData && this.costocybersource.isValidData &&
      this.montorecarga.isValidData && this.tipotarjeta.isValidData;
    }, 1000);

    this.infoDates = false; // No despliega la info
    this.fecha_inicio = moment().format('YYYY-MM-DD') + this.time; // Fecha de inicio 1 dia atrás
    this.fecha_actual = moment().format('YYYY-MM-DD HH:mm:ss'); // Fecha actual

    // this.timer = setInterval(() => {
    //   this.fecha_inicio = moment().format('YYYY-MM-DD') + this.time;
    //   this.fecha_actual = moment().format('YYYY-MM-DD HH:mm:ss');
    // }, 10000);

  }
  /**
   * Recibe un evento (click) y cierra la alerta
   * @param event
   */
  closeAlert(event: any) {
    event.splice(event, 1);
  }

  /**
  * Evento de filtrado al clic del botón filtrar el cual filtra la información
  * dadas las fechas de entrada
  */
  filtrar() {
    this.fecha_actual = moment(this.especial_fecha_actual).format('YYYY-MM-DD') + this.time_end;
    this.fecha_inicio = moment(this.especial_fecha_inicio).format('YYYY-MM-DD') + this.time;

    this.infoDates = false; // No despliega la info
    if (this.especial_fecha_actual === null || this.especial_fecha_inicio === null) {
      this.especial_fecha_actual = null;
      this.especial_fecha_inicio = null;
      this.fecha_actual = null;
      this.fecha_inicio = null;
      this.infoDates = true;
    } else {
      this.infoDates = false; // No despliega la info
      if (this.fecha_actual < this.fecha_inicio) {
        this.infoDates = true;
        // Borra datos de los inputs
        this.especial_fecha_actual = null;
        this.especial_fecha_inicio = null;

        // Regresa las fechas al día de hoy
        this.fecha_inicio = moment().format('YYYY-MM-DD') + this.time;
        this.fecha_actual = moment().format('YYYY-MM-DD HH:mm:ss');

      } else {
        this.isLoading = true;
        this.isValidData = false;
        this.timer = setTimeout(() => {
          this.isLoading = this.antifraude.isLoading && this.pasarela.isLoading && this.entidadbancaria.isLoading
            && this.costocybersource.isLoading && this.montorecarga.isLoading &&  this.tipotarjeta.isLoading;

          this.isValidData = this.antifraude.isValidData &&  this.pasarela.isValidData &&
          this.entidadbancaria.isValidData && this.costocybersource.isValidData &&
          this.montorecarga.isValidData && this.tipotarjeta.isValidData;
        }, 1000);
      }
    }
  }

  // print(divName: string) {

  //   const printContents = document.getElementById(divName).innerHTML;
  //   const originalContents = document.body.innerHTML;
  //   document.body.innerHTML = printContents;
  //   window.print();
  //   document.body.innerHTML = originalContents;
  // }

}

