import { Component, OnInit , Input, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import * as Highcharts from 'highcharts';
import { DashboardService } from '../../../services/dashboard.service';
import { GraficasComponent } from '../../../components/graficas/graficas.component';


@Component({
  selector: 'app-grafica-antifraude',
  templateUrl: './antifraude.component.html',
})


export class GraficaAntifraudeComponent implements  OnChanges {
  @Input('fechaInicio') fechaInicio: any;
  @Input('fechaFinal') fechaFinal: any;
  @ViewChild(GraficasComponent) hijo: any;
  public data: any;
  public isLoading: any;
  public isValidData: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.fechaInicio);
    // console.log(this.fechaFinal);
    this.obtenerGrafica();
  }

  obtenerGrafica() {
    const titulo_grafica = 'Antifraude - Número transacciones por estatus';
    this.data = {
      chart: {
        renderTo: 'atransacciones',
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0
        }
      },
      exporting: {
        filename: titulo_grafica,
        chartOptions: {
          title: {
              text: titulo_grafica
          }
        }
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: 'Total: <b>{point.percentage:.1f} %</b>'
      },
      plotOptions: {
        pie: {
          depth: 35
        },
        series: {
          allowPointSelect: true,
          cursor: 'pointer',
          point: {
            events: {
              // click: function(e) {
              //   const p = e.point;
              //    console.warn(p.name);
              // }.bind(this)
            }
          },
          dataLabels: {
            enabled: true,
            // format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            format: '<b>{point.name}</b>: ({point.y})',
            connectorColor: 'silver'
          }
        }
      },
      series: [
        {
          colorByPoint: true,
          data: [] // Respuesta del servicio REST
        }
      ]
    };
    this.isLoading = true;

    this.dashboardService.getTotalTransactionCybersourceGraph(this.fechaInicio, this.fechaFinal).subscribe(
      result => {
        // tslint:disable-next-line:triple-equals
        if ( result.objectResult.Total == 0 ) {
          this.isValidData = false; // No hay datos
          this.isLoading = false;
          this.data.series[0].data = [];
          this.data.exporting = {
            enabled: false,
          };
          this.data.title = {
            align: 'center',
            x: 0,
            text : 'No se encontraron datos',
            verticalAlign: 'center',
            y: 200
          };
        } else {
            this.data.series[0].data = [
                { name: 'Aprobadas',  y : result.objectResult.Aproved, sliced: true, selected: true },
                { name: 'Rechazadas',  y : result.objectResult.Reject },
                { name: 'Incidencias',  y : result.objectResult.Discrepancy }
              ];
            this.isLoading = false;
            this.isValidData = true; // Si hay datos
        }
        // Genera la gráfica de nuevo al terminar cualquier instrucción
        this.hijo.generarGrafica(this.data);

      },
      error => {
        const errorMessage = <any>error;
        console.log(errorMessage);
        this.isLoading = false;
      }
    );
  }
}

