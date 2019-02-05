import { Component, OnInit , Input, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import * as Highcharts from 'highcharts';
import { DashboardService } from '../../../services/dashboard.service';
import { GraficasComponent } from '../../../components/graficas/graficas.component';


@Component({
  selector: 'app-grafica-pasarela',
  templateUrl: './pasarela.component.html',
})


export class GraficaPasarelaComponent implements OnChanges {
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
    const titulo_grafica = 'Pasarela - Número transacciones por estatus';
    this.data = {
      chart: {
        renderTo: 'ptransaccion',
        type: 'column',
        options3d: {
          enabled: true,
          alpha: 15,
          beta: 15,
          depth: 50,
          viewDistance: 25
        }
      },
      title: {
        text: ''
      },
      exporting: {
        filename: titulo_grafica,
        chartOptions: {
          title: {
              text: titulo_grafica
          }
        }
      },
      xAxis: {
        type: 'category'
      },

      plotOptions: {
        column: {
          stacking: 'normal',
          depth: 40
      },
        series: {
          cursor: 'pointer',
          point: {
            events: {
              click: function(e) {
                const p = e.point;
                console.warn(p.name);
              }.bind(this)
            }
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{point.name}</span><br>',
        pointFormat:
        // tslint:disable-next-line:max-line-length
          '<span style="color:{point.color}">{point.name}</span><br>Número de transacciones:<b>{point.y}</b>'
      },
      series: []
    };
    this.isLoading = true;

    this.dashboardService.getTotalPasarelaTransactionsByDateFromDB(this.fechaInicio, this.fechaFinal).subscribe(
      result => {
        // tslint:disable-next-line:max-line-length
        if ( result.objectResult.Aprobadas === 0 && result.objectResult.Rechazadas === 0 && result.objectResult.Discrepancias === 0) {

          this.isValidData = false; // No hay datos
          this.isLoading = false;
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
          this.data.plotOptions.series.dataLabels = {
            enabled: true,
            inside: false,
            format: 'Total {point.name}: {point.y:,.2f}',
            color: 'black'

          };
          this.data.series = [
            {
                name: 'Aceptadas',
                data: [{ name: 'Aceptadas',  y:  result.objectResult.Aprobadas }]
            },
            {
                name: 'Rechazadas',
                data: [{ name: 'Rechazadas',  y:  result.objectResult.Rechazadas }]
            },
            {
                name: 'Con incidencia',
                data: [{ name: 'Con incidencia', y: result.objectResult.Discrepancias }]
            }
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
