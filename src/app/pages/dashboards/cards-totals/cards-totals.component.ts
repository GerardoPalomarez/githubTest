import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../../services/dashboard.service';
import * as moment from 'moment';
import * as data from '../../../../assets/config.json';
const timeMonitoreo = (<any>data).timeMonitoreo;


@Component({
  selector: 'app-cards-totales',
  styleUrls: ['./cards-totales.style.scss'],
  templateUrl: './cards-totales.component.html',
})
export class CardsTotalesComponent implements OnInit, OnChanges {
  @Input('fechaInicio') fechaInicio: any;
  @Input('fechaFinal') fechaFinal: any;
  public totales: any;
  public isLoading: any;
  public fecha_actual: any;
  public fecha_inicio: any;
  public time = ' 00:00:00';
  private timer: any;
  public monitoreoTotal: any;
  public monitoreoAntifraude: any;
  public monitoreoPasarela: any;
  public monitoreoRecarga: any;
  public update: any;

  constructor( private router: Router, private dashboardService: DashboardService) { }


  ngOnInit() {
    this.totales = {};
    this.monitoreoTotal = {};
    this.monitoreoAntifraude = {};
    this.monitoreoPasarela = {};
    this.monitoreoRecarga = {};
    this.obtenerTotales();
    this.fecha_actual = moment().format('HH:mm:ss');
    this.monitoreoServer(this.fecha_actual);
    this.timer = setInterval(() => {
      // this.fecha_inicio = moment().format('YYYY-MM-DD') + this.time;
      this.fecha_actual = moment().format('HH:mm:ss');
      this.monitoreoServer(this.fecha_actual);
    // }, Number(timeMonitoreo + '000'));
    }, 15000);



  }

  ngOnChanges(changes: SimpleChanges) {


    this.obtenerTotales();
  }

  obtenerTotales() {
    this.dashboardService.getTotalTransactions(this.fechaInicio, this.fechaFinal).subscribe(
      result => {
        const totalesArray = Object.values(result);
        // console.log(totalesArray[1]);
        this.totales = totalesArray[1];
       }, error => {
          const errorMessage = <any>error;
          console.log(errorMessage);
          this.isLoading = false;
        }
      );
  }

  monitoreoServer(time_update) {
    // console.log(fechaI);
    // console.log(fechaF);
    this.dashboardService.getStatusConexionService().subscribe(
      result => {
        const totalesArray = Object.values(result);
        this.monitoreoTotal = totalesArray[1][0];
        this.monitoreoAntifraude = totalesArray[1][1];
        this.monitoreoPasarela = totalesArray[1][2];
        this.monitoreoRecarga = totalesArray[1][3];
        this.update = ' Última actualización ' + time_update;
        // this.update = '';

        // console.log( this.monitoreoTotal);
        // console.log( this.monitoreoAntifraude);
        // console.log( this.monitoreoPasarela);
        // console.log( this.monitoreoRecarga);

       }, error => {
          const errorMessage = <any>error;
          console.log(errorMessage);
          this.isLoading = false;
        }
      );
  }
}
