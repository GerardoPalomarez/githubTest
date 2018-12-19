import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Highcharts3d from 'highcharts/highcharts-3d';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsXrange from 'highcharts/modules/xrange';
import * as Exporting from 'highcharts/modules/exporting';

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
        chart: {
          style: {
              fontFamily: 'Futura'
          }
        },
        credits: {
          enabled: false,
          text: 'PASE',
          href: 'http://pase.imsoftware-dev.com'
        }
        , exporting: {
          enabled: false

        // Textos del exporting en español
        //   menuItemDefinitions: {
        //       // Custom definition
        //       downloadPNG : {
        //        text: 'Descargar imagen en PNG'
        //       },
        //       printChart : {
        //        text: 'Imprimir gráfica'
        //       },
        //       downloadJPEG: {
        //        text: 'Descargar imagen en JPEG'
        //       },
        //       downloadPDF: {
        //       text: 'Descargar gráfica en PDF'
        //       },
        //       downloadSVG: {
        //       text: 'Descargar imagen en SVG'
        //       }
        //     }
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
