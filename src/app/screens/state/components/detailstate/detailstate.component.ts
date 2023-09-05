import { Component, ElementRef, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic.js';
import Point from '@arcgis/core/geometry/Point';
import { ActivatedRoute, Router } from '@angular/router';
import { Finca } from 'src/app/classes/finca';
import { FincaService } from 'src/app/services/finca.service';
import { MatTableDataSource } from '@angular/material/table';
import { ControlFruto } from 'src/app/classes/control-fruto';
import { MatPaginator } from '@angular/material/paginator';
import { ControlClima } from 'src/app/classes/control-clima';
import { ControlSuelo } from 'src/app/classes/control-suelo';
import { InfoFincaService } from 'src/app/services/info-finca.service';
import { Coordenadas } from 'src/app/classes/coordenadas';

@Component({
  selector: 'app-detailstate',
  templateUrl: './detailstate.component.html',
  styleUrls: ['./detailstate.component.scss'],
})
export class DetailstateComponent {
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
  private map: Map = new Map({ basemap: 'streets-vector' });

  private view: MapView = new MapView({
    center: [-75.606005, 4.742948],
    zoom: 11,
    map: this.map,
  });

  idState!: number;

  coordenadas: Coordenadas[] = [];

  finca: Finca = new Finca();

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

  ngOnInit(): void {
    this.view.container = this.mapViewEl.nativeElement;
    this.idState = Number(this.route.snapshot.paramMap.get('id'));
    this.getFinca();
    this.getCoodenadas();
    this.agregarPunto();
    this.getListaControlSuelo();
    this.getListaControlClima();
    this.getListaControlFruto();
  }

  constructor(
    private route: ActivatedRoute,
    private fincaService: FincaService,
    private readonly router: Router,
    private infoFincaService: InfoFincaService
  ) {}

  getFinca(): void {
    this.fincaService.getFinca(this.idState).subscribe({
      next: (res: any) => {
        this.finca = res;
        console.log(res);
      },
      error: (error: any) => {
        this.router.navigate(['/finca']);
      },
    });
  }

  agregarPunto() {
    var point = new Point({
      longitude: this.coordenadas[0].coordenadaX,
      latitude: this.coordenadas[0].coordenadaY,
    });

    const markerSymbol = {
      type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
      color: [226, 119, 40],
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 2,
      },
    };

    // Create a graphic and add the geometry and symbol to it
    const pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
    });
    this.view.graphics.add(pointGraphic);
  }
  getCoodenadas() {
    this.fincaService.getCoordenadas(this.idState).subscribe({
      next: (res: any) => {
        this.coordenadas = res;
        console.log(res);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getListaControlFruto() {
    this.infoFincaService.getControlFruto(this.idState).subscribe(
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
    this.infoFincaService.getControlClima(this.idState).subscribe(
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
    this.infoFincaService.getControlSuelo(this.idState).subscribe(
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
