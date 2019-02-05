import { Component, OnInit , Input, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import * as Highcharts from 'highcharts';
import { DashboardService } from '../../../services/dashboard.service';
import { GraficasComponent } from '../../../components/graficas/graficas.component';


@Component({
  selector: 'app-grafica-entidad-bancaria',
  templateUrl: './entidad-bancaria.component.html',
})


export class GraficaEntidadBancariaComponent implements  OnChanges {
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
  const titulo_grafica = 'Entidad bancaria - Número transacciones por entidad bancaria';
  this.data = {
    chart: {
      renderTo: 'ptransaccionb',
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
      }
    },
    title: {
      text: ''
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    exporting: {
      filename: titulo_grafica,
      chartOptions: {
        title: {
            text: titulo_grafica
        }
      }
    },
    plotOptions: {
      pie: {
        // innerSize: 80,
        depth: 35
      },
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        point: {
          events: {}
        }
      }
    },
    tooltip: {
      pointFormatter: function() {

        if (this.hasOwnProperty('drilldown')) {
      // tslint:disable-next-line:max-line-length
        return '<br>Número de transacciones:<b>' + this.y + '</b>' +
        '<br>Monto <b>$' + Number(this.monto).toFixed(2)  + '</b>' +
        ' <br>Aceptadas: <b>' + this.aproveed + '</b>' +
        ' <br>Rechazadas: <b>' + this.rejected + '</b>';
        // ' <br>Discrepancias: <b>' + this.discrepancy + '</b>';
            // return '<b>{series.name]:({point.y}) parent</b>';
        } else {
            return 'Número de transacciones:<b>' + this.y + '</b>' +
            '<br>Monto <b>$' + Number(this.monto).toFixed(2) + '</b>';
        }
      }
    },
    series: [
      {
        colorByPoint: true,
        data: [] // Respuesta del servicio REST
      }
    ],
    drilldown: {
      drillUpButton: {
        relativeTo: 'spacingBox',
        position: {
            verticalAlign: 'bottom',
            y: -30,
            x: 0
        }
      },
      series: []
    }
  };
  this.isLoading = true;
  this.dashboardService.getTransactionsByBankGraph(this.fechaInicio, this.fechaFinal).subscribe(
    result => {
      // tslint:disable-next-line:triple-equals
      if (result.objectResult == null) {
        // console.log('No cuenta con datos');

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
        // console.log('Si cuenta con datos');
      for (let i = 0; i < result.objectResult.length; i++) {
        // console.log(result.objectResult[i].TransactionsBank );
          this.data.plotOptions.series.dataLabels = {
            enabled: false,
            // distance: -50,
            format: 'No. transacciones: {point.y}',
            color: 'black',
            connectorColor: 'silver'

          };
            const serie = [];
            // tslint:disable-next-line:no-shadowed-variable
            for (let i = 0; i < result.objectResult.length; i++) {
                const datos = {} as any;
                // datos.name = result.objectResult[i].BankName;
                // datos.data =  [{
                  datos.name = result.objectResult[i].BankName;
                  datos.y =  result.objectResult[i].TransactionsBank;
                  datos.monto = result.objectResult[i].BankAmount;
                  datos.aproveed =  result.objectResult[i].BankDetail.Approved;
                  datos.rejected = result.objectResult[i].BankDetail.Rejected;
                  // datos.discrepancy =  result.objectResult[i].BankDetail.Discrepancy;
                  datos.drilldown = result.objectResult[i].BankName;
                // }];
                serie.push(datos);
                // console.log(datos);
                // console.log(serie);
            this.data.series[0].data =  serie;
          }
          // console.log(this.data.series[0].data);

            const drilldown = [];
            // tslint:disable-next-line:no-shadowed-variable
            for (let i = 0; i < result.objectResult.length; i++) {
                const datos = {} as any;
                datos.colorByPoint = true;
                datos.name = result.objectResult[i].BankName;
                datos.id = result.objectResult[i].BankName;
                datos.data = [
                  { name: 'Aprobadas', y: result.objectResult[i].BankDetail.Approved,
                    monto: result.objectResult[i].BankDetail.AmountApproved },
                  { name: 'Rechazadas', y: result.objectResult[i].BankDetail.Rejected,
                    monto: result.objectResult[i].BankDetail.AmountRejected  },
                  // { name: 'Discrepancia', y: result.objectResult[i].BankDetail.Discrepancy,
                  //   monto: result.objectResult[i].BankDetail.AmountDiscrepancy  }
                ];
                drilldown.push(datos);


                this.data.drilldown.series =  drilldown;
          }

            this.isLoading = false;
            this.isValidData = true; // Si hay datos
          }
          // if (result.objectResult[0].TransactionsBank === 0
          //   && result.objectResult[1].TransactionsBank === 0
          //   && result.objectResult[2].TransactionsBank === 0) {
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
