import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetailstateComponent } from '../detailstate/detailstate.component';
import { ModeloService } from 'src/app/services/modelo.service';
import * as FusionCharts from 'fusioncharts';
import { DatosGrafica } from 'src/app/classes/datos-grafica';

@Component({
  selector: 'app-ia-model',
  templateUrl: './ia-model.component.html',
  styleUrls: ['./ia-model.component.scss'],
})
export class IaModelComponent {
  dataSource: any;
  basicOptions: any;
  datosPredicion: any;

  constructor(
    private dialogRef: MatDialogRef<DetailstateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataSource = {
      chart: {
        caption: 'Puntaje del Modelo de inteligencia artificial',
        subcaption: 'Predicción de materia seca del fruto',
        lowerLimit: '0',
        upperLimit: '57',
        theme: 'fusion',
      },
      colorRange: {
        color: [
          {
            minValue: '0',
            maxValue: '18.5',
            code: '#F2726F',
          },
          {
            minValue: '18.6',
            maxValue: '23.5',
            code: '#FFC533',
          },
          {
            minValue: '23.6',
            maxValue: '33.5',
            code: '#62B58F',
          },
          {
            minValue: '33.6',
            maxValue: '38.5',
            code: '#FFC533',
          },
          {
            minValue: '38.6',
            maxValue: '57',
            code: '#F2726F',
          },
        ],
      },
      dials: {
        dial: [
          {
            value: data.prediccion > 57 ? 57 : data.prediccion,
          },
        ],
      },
    };
    this.datosPredicion = {
      labels: data.nombres,
      datasets: [
        {
          label: 'Variables importantes',
          data: data.valores,
          backgroundColor: '#799d51',
          borderColor: '#799d51',
          borderWidth: 1,
        },
      ],
    };
  }

  getColors(length: number): string[] {
    return Array.from(
      { length },
      () => '#' + ((Math.random() * 0xffffff) << 0).toString(16)
    );
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
