import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ControlFruto } from 'src/app/modelo/control-fruto';
import { ControlClima } from 'src/app/modelo/control-clima';
import { ControlSuelo } from 'src/app/modelo/control-suelo';
import { DatosPublicosService } from 'src/app/services/datos-publicos/datos-publicos.service';

@Component({
  selector: 'app-datos-publicos',
  templateUrl: './datos-publicos.component.html',
  styleUrls: ['./datos-publicos.component.css'],
})
export class DatosPublicosComponent {
  displayedColumnsSuelo: any[] = [
    'fecha',
    'medidaPh',
    'materiaOrganica',
    'elementoK',
    'elementoCa',
    'elementoMg',
    'elementoNa',
    'elementoP',
  ];
  displayedColumnsFruto: any[] = [
    'fecha',
    'tamano',
    'perfilesAcidosGrasos',
    'materiaSeca',
    'contenidoHumedad',
    'elementoCa',
  ];
  displayedColumnsClima: any[] = [
    'fecha',
    'temperatura',
    'humedadRelativa',
    'precipitacion',
    'radiacionSolar',
    'direccionViento',
    'velocidadViento',
  ];

  listaControlSuelo?: any;
  listaControlClima?: any;
  listaControlFruto?: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private datosPublicosService: DatosPublicosService) {}

  ngOnInit(): void {
    this.getListaControlSuelo();
    this.getListaControlClima();
    this.getListaControlFruto();
  }
  getListaControlFruto() {
    this.datosPublicosService.getControlFruto().subscribe(
      (response: any) => {
        console.log(response);
        this.listaControlFruto = new MatTableDataSource<ControlFruto[]>(
          response
        );
        this.listaControlFruto.paginator = this.paginator;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getListaControlClima() {
    this.datosPublicosService.getControlClima().subscribe(
      (response: any) => {
        console.log(response);
        this.listaControlClima = new MatTableDataSource<ControlClima[]>(
          response
        );
        this.listaControlClima.paginator = this.paginator;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getListaControlSuelo() {
    this.datosPublicosService.getControlSuelo().subscribe(
      (response: any) => {
        console.log(response);
        this.listaControlSuelo = new MatTableDataSource<ControlSuelo[]>(
          response
        );
        this.listaControlSuelo.paginator = this.paginator;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
