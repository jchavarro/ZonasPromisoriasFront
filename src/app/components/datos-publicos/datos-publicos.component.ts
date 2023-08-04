import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ControlSuelo } from 'src/app/modelo/control-suelo';
import { DatosPublicosService } from 'src/app/services/datos-publicos/datos-publicos.service';

@Component({
  selector: 'app-datos-publicos',
  templateUrl: './datos-publicos.component.html',
  styleUrls: ['./datos-publicos.component.css'],
})
export class DatosPublicosComponent {
  displayedColumns: any[] = [
    'fecha',
    'medidaPh',
    'materiaOrganica',
    'elementoK',
    'elementoCa',
    'elementoMg',
    'elementoNa',
    'elementoP',
  ];

  listaControlSuelo?: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private datosPublicosService: DatosPublicosService) {}

  ngOnInit(): void {
    this.getListaControlSuelo();
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
