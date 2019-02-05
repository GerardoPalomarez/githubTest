import { Component, OnInit , Input, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import * as Highcharts from 'highcharts';
import { DashboardService } from '../../../services/dashboard.service';
import { GraficasComponent } from '../../../components/graficas/graficas.component';


@Component({
  selector: 'app-grafica-monto-recarga',
  templateUrl: './monto-recarga.component.html',
})


export class GraficaMontoRecargaComponent implements  OnChanges {
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
  const titulo_grafica = 'Monto de recarga - Número transacciones por monto de recarga';
  this.data = {
    chart: {
      renderTo: 'rtransaccionr',
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
      pointFormat: 'Total de transacciones: <b>{point.y}</b><br>' +
      '<b>Monto</b>: ${point.monto:,.2f}'
    },
    plotOptions: {
      pie: {
        innerSize: 80,
        depth: 35
      },
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        point: {
          events: {}
        },
        dataLabels: {
          enabled: true,
          // format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          format: 'Monto <b>${point.name:,.2f}</b>: ({point.y})',
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

  this.dashboardService.getTransactionsByRechargeAmountGraph(this.fechaInicio, this.fechaFinal).subscribe(
    result => {
      // console.log(result);
      // tslint:disable-next-line:max-line-length
      for (let i = 0; i < result.objectResult.length; i++) {
      if ( result.objectResult[i].Transactions === 0) {
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
        const serie = [];
        // tslint:disable-next-line:no-shadowed-variable
          for (let i = 0; i < result.objectResult.length; i++) {
            const datos = {} as any;
              datos.name = result.objectResult[i].RechargeAmount,
              datos.y = result.objectResult[i].Transactions,
              datos.monto = result.objectResult[i].Amount,
              serie.push(datos);
              this.data.series[0].data = serie;
          }
          this.isLoading = false;
          this.isValidData = true; // Si hay datos
        }
        // Genera la gráfica de nuevo al terminar cualquier instrucción
        this.hijo.generarGrafica(this.data);
      }
    },
    error => {
      const errorMessage = <any>error;
      console.log(errorMessage);
      this.isLoading = false;
    }
  );

}
}
