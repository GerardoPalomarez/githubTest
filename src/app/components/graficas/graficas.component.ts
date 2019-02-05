import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Highcharts3d from 'highcharts/highcharts-3d';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldrowm from 'highcharts/modules/drilldown';
import HighchartsXrange from 'highcharts/modules/xrange';
import * as Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);
Highcharts3d(Highcharts);
HighchartsMore(Highcharts);
HighchartsXrange(Highcharts);
HighchartsDrilldrowm(Highcharts);

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
})
export class GraficasComponent implements OnInit, AfterViewInit {
  @Input('grafica') grafica: any;

  constructor() {}

  ngOnInit() {
    // Configuración de colores en las gráficas
    const  colores = [
    '#0046ad', '#7ab800', '#ff9900', '#80699B', '#ff0066', '#92A8CD', '#A47D7C',
    '#B5CA92', '#6b6b47', '#660044', '#0066ff', '#660033', '#663300', '#00ff00',
    '#ffff00', '#ff4d4d', '#00b3b3', '#133913', '#ff0000', '#006666', '#ff3300'];

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
            fontFamily: 'Futura !important',
            'border-radius': '5px',
        },
        styledMode: true
      },
      credits: {
        enabled: false
      },
      lang: {
        contextButtonTitle: 'Exportar la gráfica',
        drillUpText: 'Regresar'
      },
      // Agrega selecciones de las series con su nombre
      plotOptions: {
        series: {
          showInLegend: true
        }
      },
      exporting: {
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
    Highcharts.chart(grafica);
  }
}
