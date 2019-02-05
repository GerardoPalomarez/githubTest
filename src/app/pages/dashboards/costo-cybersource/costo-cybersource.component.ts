import { Component, OnInit , Input, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import * as Highcharts from 'highcharts';
import { DashboardService } from '../../../services/dashboard.service';
import { GraficasComponent } from '../../../components/graficas/graficas.component';


@Component({
  selector: 'app-grafica-costo-cybersource',
  templateUrl: './costo-cybersource.component.html',
})


export class GraficaCostoCyberSourceComponent implements  OnChanges {
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
  const titulo_grafica = 'Costo CyberSource - Costo operativo por tipo de transacción';
  this.data = {
    chart: {
      renderTo: 'costos',
      type: 'column',
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
      pointFormat: '<b>No. {point.name}:</b> {point.y} <br' +
      '<b>Costo por bracket:</b> ${point.costo:,.2f}'
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
            click: function(e) {
              const p = e.point;
               console.warn(p.name);
            }.bind(this)
          }
        },
        dataLabels: {
          enabled: true,
          // format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          // format: '<b>{point.name}</b>: ({point.y})',
          // connectorColor: 'silver'
        }
      }
    },
    series: [
      {
        colorByPoint: true,
        data: []
      }
    ]
  };
  this.isLoading = true;

  this.dashboardService.getTotalTransByOperationGraph(this.fechaInicio, this.fechaFinal).subscribe(
    result => {
      for (let i = 0; i < result.objectResult.length; i++) {
      if ( result.objectResult[i].Transactions === 0  &&
        result.objectResult[i].Tokens === 0) {
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
        const categories = [];
        // tslint:disable-next-line:no-shadowed-variable
        for (let i = 0; i < result.objectResult.length; i++) {
            // const datos = {} as any;
            // datos.name = result.objectResult[i].Month;
            categories.push(result.objectResult[i].Month);

        }
        // console.log(categories);
        this.data.xAxis = {
          categories
        };
        // this.data.series =  serie;
        // this.data.xAxis = {
        //   categories: [
        //     result.objectResult[0].Month,
        //     result.objectResult[1].Month,
        //     result.objectResult[2].Month
        //   ]};
          // console.log(this.data.xAxis.categories);
          const antifraude = [];
          const tokenizacion = [];
          // tslint:disable-next-line:no-shadowed-variable
          for (let i = 0; i < result.objectResult.length; i++) {
            const objectAntifraude = {} as any;
            const objectTokenizacion = {} as any;
            // datos.name = result.objectResult[i].Month;
            objectAntifraude.data =  {
              name: 'Peticiones Antifraude',
              y: result.objectResult[i].Transactions
            };
            antifraude.push(objectAntifraude.data);
            objectTokenizacion.data =  {
              name: 'Tokenizaciones',
              y:  result.objectResult[i].Tokens,
              costo:  result.objectResult[i].Payment
            };
            // console.log(objectAntifraude);
            tokenizacion.push(objectTokenizacion.data);
        }

        this.data.series = [{
          name: 'Peticiones Antifraude',
          data: antifraude
        },
        {
            name: 'Tokenizaciones',
            data: tokenizacion
        }
      ];


      //   this.data.series = [{
      //     name: 'Peticiones Antifraude',
      //     data: [
      //       {name: 'Peticiones Antifraude', y: result.objectResult[0].Transactions},
      //       {name: 'Peticiones Antifraude', y: result.objectResult[1].Transactions},
      //       {name: 'Peticiones Antifraude', y: result.objectResult[2].Transactions}
      //     ]
      //   },
      //   {
      //       name: 'Tokenizaciones',
      //       data: [
      //         {name: 'Tokenizaciones', y:  result.objectResult[0].Tokens, costo:  result.objectResult[0].Payment},
      //         {name: 'Tokenizaciones', y:  result.objectResult[1].Tokens, costo:  result.objectResult[1].Payment},
      //         {name: 'Tokenizaciones', y:  result.objectResult[2].Tokens, costo:  result.objectResult[2].Payment}
      //       ]
      //   }
      // ];

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
