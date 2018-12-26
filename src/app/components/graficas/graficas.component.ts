import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Highcharts3d from 'highcharts/highcharts-3d';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsXrange from 'highcharts/modules/xrange';
import * as Exporting from 'highcharts/modules/exporting';
import * as CSV from 'highcharts/modules/export-data';


Exporting(Highcharts);
Highcharts3d(Highcharts);
HighchartsMore(Highcharts);
HighchartsXrange(Highcharts);
@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
})
export class GraficasComponent implements OnInit, AfterViewInit {
  @Input('grafica') grafica: any;

  constructor() {}

  ngOnInit() {
      // Configuración de colores en las gráficas
      const  colores = ['#0046ad', '#7ab800', '#ff9900', '#80699B', '#ff0066',
      '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'];

      Highcharts.setOptions({
        colors: Highcharts.map(colores, function (color) {
          return {
            radialGradient: {
              cx: 0.5,
              cy: 0.3,
              r: 0.7
            },
            stops: [
              [0, color],
              [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
          };
        }),
        credits: {
          enabled: false
        },
        chart: {
          // backgroundColor: 'whitesmoke',
          style: {
              fontFamily: 'Futura !important',
              'border-radius': '5px',
          },
          styledMode: true
        },
        lang: {
          contextButtonTitle: 'Exportar la gráfica'
        }
        // Agrega selecciones de las series con su nombre
        , plotOptions: {
          series: {
            showInLegend: true
          }
        },
         exporting: {
          // style: {
          //   fontFamily: 'sans-serif'
          // },
          enabled: true,
          buttons: {
            contextButton: {
                menuItems: ['downloadJPEG', 'downloadPNG', 'downloadPDF']
            }
          },
        // Textos del exporting en español
          menuItemDefinitions: {
              downloadJPEG: {
               text: 'Descargar gráfica en JPEG'
               },
               downloadPNG: {
                text: 'Descargar gráfica en PNG'
               },
               downloadPDF: {
                text: 'Descargar gráfica en PDF'
               }
            }
      }
      });
  }

  ngAfterViewInit () {
    // Generación de la gráfica hasta que la vista se carga por completo.
      Highcharts.chart(this.grafica);
  }

  generarGrafica(grafica) {
    // console.log(grafica);
    Highcharts.chart(grafica);
  }
}
