import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ControlClima } from 'src/app/classes/control-clima';
import { ControlFruto } from 'src/app/classes/control-fruto';
import { ControlSuelo } from 'src/app/classes/control-suelo';
import { DatosPublicosService } from 'src/app/services/datos-publicos.service';

@Component({
  selector: 'app-publicdata',
  templateUrl: './publicdata.component.html',
  styleUrls: ['./publicdata.component.css'],
})
export class PublicdataComponent {
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

        this.paginator._intl.itemsPerPageLabel = 'items por pagina';
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

        this.paginator._intl.itemsPerPageLabel = 'items por pagina';
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

        this.paginator._intl.itemsPerPageLabel = 'items por pagina';
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
