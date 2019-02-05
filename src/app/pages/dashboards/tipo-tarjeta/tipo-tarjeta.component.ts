import { Component, OnInit , Input, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import * as Highcharts from 'highcharts';
import { DashboardService } from '../../../services/dashboard.service';
import { GraficasComponent } from '../../../components/graficas/graficas.component';


@Component({
  selector: 'app-grafica-tipo-tarjeta',
  templateUrl: './tipo-tarjeta.component.html',
})


export class GraficaTipoTarjetaComponent implements OnChanges {
  @Input('fechaInicio') fechaInicio: any;
  @Input('fechaFinal') fechaFinal: any;
  @ViewChild(GraficasComponent) hijo: any;
  public data: any;
  public isLoading: any;
  public isValidData: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.fechaInicio);
    // console.log(this.fechaFinal);
    this.obtenerGrafica();
  }

  obtenerGrafica() {
    const titulo_grafica = 'Tipo de tarjeta - Costo operativo por tipo de tarjeta';
    this.data = {
      chart: {
        renderTo: 'rtransacciont',
        type: 'bar',
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
          // title: {
          //     text: null
          // }
      },
      yAxis: {
          min: 0,
          labels: {
              overflow: 'justify'
          }
      },
      plotOptions: {
        bar: {
          stacking: 'normal',
          depth: 40
        },
        series: {
          cursor: 'pointer'
        }
      },
      tooltip: {
        formatter: function() {
          return (
            '<span style="color:' +
            this.point.color +
            '>' +
            this.point.name +
            '</span><br>No. de transacciones' +
            this.point.y +
            '</b><br> Monto total del tipo de tarjeta <b>$' +
            Highcharts.numberFormat(this.point.monto, 2) +
            '</b>'
          );
        }
      },
      series: [
        // {
        //   name: 'American Express',
        //   data: [{name: 'American Express', y: 17, monto: 150}]
        // },
        // {
        //   name: 'VISA',
        //   data: [{name: 'VISA', y: 33, monto: 100}]
        // },
        // {
        //   name: 'Master card',
        //   data: [{name: 'Master card', y: 14, monto: 140}]
        // }
      ]
    };
    this.isLoading = true;

    this.dashboardService.getTotalTransByAccountTypeGraph(this.fechaInicio, this.fechaFinal).subscribe(
      result => {

        // tslint:disable-next-line:max-line-length
        if ( result.objectResult.Credit === 0 && result.objectResult.Debit === 0) {

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
            format: 'Total {point.name}: {point.y}',
            color: 'black'

          };
          this.data.series = [
            {
                name: 'Crédito',
                data: [{ name: 'Crédito',  y:  result.objectResult.Credit, monto: result.objectResult.AmountCredit }]
            },
            {
                name: 'Débito',
                data: [{ name: 'Débito',  y:  result.objectResult.Debit, monto: result.objectResult.AmountDebit}]
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
