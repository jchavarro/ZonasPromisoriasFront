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
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-detailstate',
  templateUrl: './detailstate.component.html',
  styleUrls: ['./detailstate.component.scss'],
})
export class DetailstateComponent {
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
  private map: Map = new Map({ basemap: 'streets-vector' });

  private view: MapView = new MapView({
    center: [-75.865748, 4.942948],
    zoom: 8,
    map: this.map,
  });

  idState!: number;

  coordenadas: Coordenadas[] = [];

  estudiosSuelo: any[] = [];
  estudiosClima: any[] = [];
  estudiosFruto: any[] = [];

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
    'elementoN',
    'elementoAl',
    'elementoCo',
    'porcentajeMin',
  ];
  displayedColumnsFruto: any[] = [
    'fecha',
    'tamano',
    'materiaSeca',
    'contenidoHumedad',
    'elementoCa',
    'clasificacionCf',
  ];
  displayedColumnsClima: any[] = [
    'fecha',
    'temperatura',
    'humedadRelativa',
    'precipitacion',
    'radiacionSolar',
    'direccionViento',
    'velocidadViento',
    'humedadSuelo',
    'temperaturaSuelo',
  ];
  listaControlSuelo?: any;
  listaControlClima?: any;
  listaControlFruto?: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.view.container = this.mapViewEl.nativeElement;
    this.idState = Number(this.route.snapshot.paramMap.get('id'));
    this.getFinca();
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

  dataUrl(tipoImagen: any, datos: any): string {
    if (!!datos) {
      return 'data:' + tipoImagen + ';base64,' + datos;
    }
    return '/assets/noimage.jpg';
  }

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
    this.fincaService.getCoordenadas(this.idState).subscribe({
      next: (res: Coordenadas[]) => {
        this.coordenadas = res;
        console.log(res);

        var point = new Point({
          longitude: this.coordenadas[0].coordenadaX,
          latitude: this.coordenadas[0].coordenadaY,
        });

        const markerSymbol = {
          type: 'simple-marker',
          color: [50, 119, 40],
          outline: {
            color: [255, 255, 255],
            width: 2,
          },
        };
        const pointGraphic = new Graphic({
          geometry: point,
          symbol: markerSymbol,
        });
        this.view.graphics.add(pointGraphic);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  csvImportSuelo($event: any) {
    const files = $event.target.files;
    if (!files.length) {
      return;
    }
    const file = files[0];
    this.convertToArrayBuffer(file).then(
      (data) => {
        this.estudiosSuelo = data;
        this.fincaService.addControlSuelo(this.estudiosSuelo).subscribe({
          next: (response: any) => {
            console.log(response);
            this.getListaControlSuelo();
            this.estudiosSuelo = [];
          },
          error: (error: any) => {
            console.log(error);
            this.estudiosSuelo = [];
          },
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  csvImportClima($event: any) {
    const files = $event.target.files;
    if (!files.length) {
      return;
    }
    const file = files[0];
    this.convertToArrayBuffer(file).then(
      (data) => {
        this.estudiosClima = data;
        console.log(this.estudiosClima);
        this.fincaService.addControlClima(this.estudiosClima).subscribe({
          next: (response: any) => {
            console.log(response);
            this.getListaControlClima();
            this.estudiosClima = [];
          },
          error: (error: any) => {
            console.log(error);
            this.estudiosClima = [];
          },
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  csvImportFruto($event: any) {
    const files = $event.target.files;
    if (!files.length) {
      return;
    }
    const file = files[0];
    this.convertToArrayBuffer(file).then(
      (data) => {
        this.estudiosFruto = data;
        console.log(this.estudiosFruto);
        this.fincaService.addControlFruto(this.estudiosFruto).subscribe({
          next: (response: any) => {
            console.log(response);
            this.getListaControlClima();
            this.estudiosFruto = [];
          },
          error: (error: any) => {
            console.log(error);
            this.estudiosFruto = [];
          },
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  convertToArrayBuffer(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const binaryData = e.target?.result;
        const workbook = XLSX.read(binaryData, { type: 'array' });
        const first_sheet_name = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[first_sheet_name];
        resolve(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  getListaControlFruto() {
    this.infoFincaService.getControlFruto(this.idState).subscribe({
      next: (response: any) => {
        console.log(response);
        this.listaControlFruto = new MatTableDataSource<ControlFruto[]>(
          response
        );
        this.listaControlFruto.paginator = this.paginator;

        this.paginator._intl.itemsPerPageLabel = 'items por pagina';
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getListaControlClima() {
    this.infoFincaService.getControlClima(this.idState).subscribe({
      next: (response: any) => {
        console.log(response);
        this.listaControlClima = new MatTableDataSource<ControlClima[]>(
          response
        );
        this.listaControlClima.paginator = this.paginator;

        this.paginator._intl.itemsPerPageLabel = 'items por pagina';
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  getListaControlSuelo() {
    this.infoFincaService.getControlSuelo(this.idState).subscribe({
      next: (response: any) => {
        console.log(response);
        this.listaControlSuelo = new MatTableDataSource<ControlSuelo[]>(
          response
        );
        this.listaControlSuelo.paginator = this.paginator;

        this.paginator._intl.itemsPerPageLabel = 'items por pagina';
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  descargarFormatoSuelo() {
    const headings = this.displayedColumnsSuelo;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(ws, [headings], { origin: 'A1' });
    XLSX.utils.book_append_sheet(wb, ws, 'Formato suelo');
    XLSX.writeFile(wb, 'Formatosuelo.xlsx');
  }
  descargarFormatoClima() {
    const headings = this.displayedColumnsClima;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(ws, [headings], { origin: 'A1' });
    XLSX.utils.book_append_sheet(wb, ws, 'Formato clima');
    XLSX.writeFile(wb, 'Formatoclima.xlsx');
  }
  descargarFormatoFruto() {
    const headings = this.displayedColumnsFruto;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(ws, [headings], { origin: 'A1' });
    XLSX.utils.book_append_sheet(wb, ws, 'Formato fruto');
    XLSX.writeFile(wb, 'Formatofruto.xlsx');
  }
}
