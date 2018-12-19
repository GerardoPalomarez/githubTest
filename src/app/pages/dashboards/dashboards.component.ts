import { Component, OnInit, ViewChild} from '@angular/core';
import { BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import * as moment from 'moment';
import * as Highcharts from 'highcharts';
import { ApiService } from '../../services/api.service';
import { GraficasComponent } from '../../components/graficas/graficas.component';
// import { defineLocale } from 'ngx-bootstrap/bs-moment';
// import { es } from 'ngx-bootstrap/locale';
// defineLocale('es', es);
declare let jQuery: any;

@Component({
  selector: 'app-dashboards',
  styleUrls: ['./dashboards.style.scss'],
  templateUrl: './dashboards.template.html'
})

export class DashboardsComponent implements OnInit {
  @ViewChild(GraficasComponent) hijo: any;
  bsConfig: Partial<BsDatepickerConfig>;
  public fecha_actual: any;
  public fecha_inicio: any;
  public time = 'T00:00:00Z';
  public time_end = 'T23:59:59Z';
  public maxDate: any;
  public minDate: any;
  public especial_fecha_actual: any; // Fecha final
  public especial_fecha_inicio: any; // Fecha inicio
  public atransacciones: any;
  public costos: any;
  public grafica: any;
  public data: any;
  public ptransaccion: any;
  public ptransaccionb: any;
  public rtransacciont: any;
  public rtransaccionr: any;
  public bsValue: any;
  public isLoading: boolean;
  public isValidData: boolean;
  public infoDates: boolean;
  // Totales
  public totales: any;


  constructor( private router: Router, private apiService: ApiService ) {
    const local = 'es';
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

    this.isLoading = true;
    this.isValidData = false; // No hay datos
    this.infoDates = false; // No despliega la info
    this.totales = {};
    this.fecha_inicio = moment().format('YYYY-MM-DD') + this.time; // Fecha de inicio 1 dia atrás
    this.fecha_actual = moment().format('YYYY-MM-DDThh:mm:ss[Z]'); // Fecha actual
    // console.log(this.fecha_inicio);
    // console.log(this.fecha_actual);

    // Obtener los totales de transacciones
    this.obtenerTotalTransacciones(this.fecha_inicio, this.fecha_actual);
    // Gráfica de transacciones por status
    // this.obtenerATransaccionesToday();
    this.obtenerATransacciones(this.fecha_inicio, this.fecha_actual);
    // Gráfica de costos por tipo de operacion
    // this.obtenerACostos(this.fecha_inicio, this.fecha_actual);
    // Gráfica de transacciones de la pasarela
    // this.obtenerPTransacciones(this.fecha_inicio, this.fecha_actual);
    // Grafica de transacciones por banco
    // this.obtenerPTransaccionesB(this.fecha_inicio, this.fecha_actual);
    // Grafica transaciones por tipo de tarjeta
    // this.obtenerRTransaccionesT(this.fecha_inicio, this.fecha_actual);
    // Grafica de transacciones por monto
    // this.obtenerRTransaccionesR(this.fecha_inicio, this.fecha_actual);

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

    // Datos API local
    this.fecha_actual = moment(this.especial_fecha_actual).format('YYYY-MM-DD') + this.time_end; // T00:00:00Z
    this.fecha_inicio = moment(this.especial_fecha_inicio).format('YYYY-MM-DD') + this.time; // T23:59:59Z
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
        this.fecha_actual = moment().format('YYYY-MM-DDThh:mm:ss[Z]');

      } else {
        this.infoDates = false;

        // Total de transacciones por fecha
        this.obtenerTotalTransacciones(this.fecha_inicio, this.fecha_actual);
        // Gráfica de transacciones por status
        this.obtenerATransacciones(this.fecha_inicio, this.fecha_actual);
        // Gráfica de costos por tipo de operacion
        // this.obtenerACostos(this.fecha_inicio, this.fecha_actual);
        // Gráfica de transacciones de la pasarela
        // this.obtenerPTransacciones(this.fecha_inicio, this.fecha_actual);
        // Grafica de transacciones por banco
        // this.obtenerPTransaccionesB(this.fecha_inicio, this.fecha_actual);
        // Grafica transaciones por tipo de tarjeta
        // this.obtenerRTransaccionesT(this.fecha_inicio, this.fecha_actual);
        // Grafica de transacciones por monto
        // this.obtenerRTransaccionesR(this.fecha_inicio, this.fecha_actual);


      }
    }

  }

  /**
   * Obtiene todos los totales de transacciones registrados en el sistema
   * @param inicial
   * @param final
   */
  obtenerTotalTransacciones(inicial: any, final: any) {
    this.apiService.getTotalTransaccionesByDate(inicial, final).subscribe(
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

  /**
   * Obtiene los datos de numero de transacciones por status y recibe dos parametros
   * de entrada para hacer la consulta del servicio
   * @param inicial
   * @param final
   */
  obtenerATransacciones(inicial: any, final: any) {
    this.atransacciones = {
      chart: {
        renderTo: 'atransacciones',
        type: 'pie'
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: 'Total: <b>{point.percentage:.1f} %</b>'
      },
      plotOptions: {
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
            format: '<b>{point.name}</b>: ({point.y})',
            connectorColor: 'silver'
          }
        }
      },
      // data : {
      //   enablePolling: true
      // },
      series: [
        {
          colorByPoint: true,
          data: [] // Respuesta del servicio REST
        }
      ]
    };
    this.isLoading = true;

    this.apiService.getGraficaAtransacciones(inicial, final).subscribe(
      result => {
        const resultArray = Object.values(result);
        // tslint:disable-next-line:triple-equals
        if ( resultArray[1][0].total == 0 ) {
          this.isValidData = false; // No hay datos
          this.isLoading = false;
          this.atransacciones.series[0].data = [];
          this.atransacciones.title = {
            align: 'center',
            x: 0,
            text : 'No se encontraron datos',
            verticalAlign: 'center',
            y: 200
          };
        } else {
          if (resultArray[0] === 1) {
            this.atransacciones.series[0].data = [
                { name: 'Aprobadas',  y : resultArray[1][0].aproved },
                { name: 'Rechazadas',  y : resultArray[1][0].reject },
                { name: 'Incidencias',  y : resultArray[1][0].discrepancy }
              ];
            this.isLoading = false;
            this.isValidData = true; // Si hay datos
          } else {
            this.isLoading = false;
            this.isValidData = false; // No hay datos
          }
        }
        // Genera la gráfica de nuevo al terminar cualquier instrucción
        this.hijo.generarGrafica(this.atransacciones);
      },
      error => {
        const errorMessage = <any>error;
        console.log(errorMessage);
        this.isLoading = false;
      }
    );
  }

  /**
   * Obtiene los datos para la gráfica de transacciones y sus costos, recibe dos fechas de entrada
   * para la consulta de su servicio.
   * @param inicial
   * @param final
   */
  obtenerACostos(inicial: any, final: any) {
  this.costos = {
      chart: {
        renderTo: 'costos',
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
      xAxis: {
        type: 'category'
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {
              click: function(e) {
                const p = e.point;
              }.bind(this)
            }
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{point.name}</span><br>',
        pointFormat:
        // tslint:disable-next-line:max-line-length
          '<span style="color:{point.color}">{point.name}</span><br>Número de transacciones:<b>{point.y}</b><br>El costo total es de:<b>${point.costo}</b> '
      },
      series: [
        {
          colorByPoint: true,
          data: []
        }
      ]
    };
  }

  obtenerPTransacciones(inicial: any, final: any) {
    this.ptransaccion = {
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
      xAxis: {
        type: 'category'
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {
              click: function(e) {
                const p = e.point;
                console.log(p.id, p.name);
              }.bind(this)
            }
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{point.name}</span><br>',
        pointFormat:
         // tslint:disable-next-line:max-line-length
          '<span style="color:{point.color}">{point.name}</span><br>Número de transacciones:<b>{point.y}</b><br>El costo total es de:<b>${point.costo}</b> '
      },
      series: [
        {
          colorByPoint: true,
          data: [
            { id: 1, name: 'Aceptadas', costo: 10000, y: 2118 },
            { id: 2, name: 'Rechazadas', costo: 224000, y: 20 },
            { id: 3, name: 'Con incidencia', costo: 0, y: 18 }
          ]
        }
      ]
    };
  }

  obtenerPTransaccionesB(inicial: any, final: any) {
    this.ptransaccionb = {
      chart: {
        renderTo: 'ptransaccionb',
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'category'
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {
              click: function(e) {
                const p = e.point;
                console.log(p.id, p.name);
              }.bind(this)
            }
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{point.name}</span><br>',
        // tslint:disable-next-line:max-line-length
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span><br>Número de transacciones:<b>{point.y}</b>'
      },
      series: [
        {
          colorByPoint: true,
          data: [
            { id: 1, name: 'Bancomer', y: 705 },
            { id: 2, name: 'Banamex', y: 707 },
            { id: 3, name: 'Banorte', y: 706 }
          ]
        }
      ]
    };
  }

  obtenerRTransaccionesT(inicial: any, final: any) {
    this.rtransacciont = {
      chart: {
        renderTo: 'rtransacciont',
        type: 'xrange'
      },
      title: {
        text: ''
      },
      yAxis: {
        categories: ['Crédito', 'Débito']
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {
              click: function(e) {
                const p = e.point;
                console.log(p.id, p.name);
              }.bind(this)
            }
          }
        }
      },
      tooltip: {
        formatter: function() {
          // tslint:disable-next-line:max-line-length
          return (
            '<span style="color:' +
            this.point.color +
            '>' +
            this.point.name +
            '</span><br> Pagos con tarjeta de ' +
            this.point.name +
            ' <b>' +
            (this.point.x2 - this.point.x) +
            '</b><br> Monto total del tipo de tarjeta <b>$' +
            Highcharts.numberFormat(this.point.monto, 2) +
            '</b>'
          );
        }
      },
      series: [
        {
          borderColor: 'gray',
          pointWidth: 50,
          data: [
            {
              id: 1,
              name: 'Crédito',
              x: 0,
              x2: 1753,
              y: 0,
              monto: 406720
            },
            {
              id: 2,
              name: 'Débito',
              x: 1753,
              x2: 2117,
              y: 1,
              monto: 224530
            }
          ]
        }
      ]
    };
  }

  obtenerRTransaccionesR(inicial: any, final: any) {
    this.rtransaccionr = {
      chart: {
        renderTo: 'rtransaccionr',
        type: 'waterfall'
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'category'
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {
              click: function(e) {
                const p = e.point;
                console.log(p.id, p.name);
              }.bind(this)
            }
          }
        }
      },
      tooltip: {
        // pointFormat: '<b>{point.y}</b> recargas de {point.name}<br> Monto total de recargas {point.y*point.monto}'
        formatter: function() {
          // tslint:disable-next-line:max-line-length
          return (
            '<b>' +
            this.point.y +
            '</b> recargas de ' +
            this.point.name +
            '<br> Monto total de recargas: $' +
            Highcharts.numberFormat(this.point.y * this.point.monto, 2)
          );
        }
      },
      series: [
        {
          colorByPoint: true,
          data: [
            {
              id: 1,
              name: '$50 pesos',
              y: 389,
              monto: 50
            },
            {
              id: 2,
              name: '$100 pesos',
              y: 358,
              monto: 100
            },
            {
              id: 3,
              name: '$200 pesos',
              y: 785,
              monto: 200
            },
            {
              id: 4,
              name: '$500 pesos',
              y: 332,
              monto: 500
            },
            {
              id: 5,
              name: '$1000 pesos',
              y: 253,
              monto: 1000
            }
          ],
          dataLabels: {
            enabled: true
          },
          pointPadding: 0
        }
      ]
    };
  }

}
