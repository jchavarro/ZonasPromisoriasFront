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
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatosGrafica } from 'src/app/classes/datos-grafica';
import { MatDialog } from '@angular/material/dialog';
import { IaModelComponent } from '../ia-model/ia-model.component';
import { ModeloService } from 'src/app/services/modelo.service';

@Component({
  selector: 'app-detailstate',
  templateUrl: './detailstate.component.html',
  styleUrls: ['./detailstate.component.scss'],
})
export class DetailstateComponent {
  display: FormControl = new FormControl('', Validators.required);

  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
  private map: Map = new Map({ basemap: 'streets-vector' });

  private view: MapView = new MapView({
    center: [-75.865748, 4.942948],
    zoom: 8,
    map: this.map,
  });

  datosGraficaSuelo: DatosGrafica = {
    labels: [],
    datasets: [
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
    ],
  };
  datosGraficaClima: DatosGrafica = {
    labels: [],
    datasets: [
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
    ],
  };
  datosGraficaFruto: DatosGrafica = {
    labels: [],
    datasets: [
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
      { data: [], label: '', backgroundColor: this.getRandomColor() },
    ],
  };
  basicOptions: any;

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

  private toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

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
    private infoFincaService: InfoFincaService,
    private dialog: MatDialog,
    private modeloService: ModeloService
  ) {}

  openDialog() {
    this.modeloService.getModeloSolo(this.idState).subscribe({
      next: (response: any) => {
        const dialogRef = this.dialog.open(IaModelComponent, {
          data: response,
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
        });
      },
      error: (error: any) => {
        this.toast.fire({
          icon: 'error',
          title: 'Error al correr el modelo de IA',
        });
        console.log(error);
      },
    });
  }

  getDatosGraficaSuelo(datosSueloResponse: any) {
    console.log(datosSueloResponse);
    console.log(this.datosGraficaSuelo);

    datosSueloResponse.forEach((element: any) => {
      this.datosGraficaSuelo.labels.push(element.fecha);

      this.datosGraficaSuelo.datasets[0].data.push(element.medidaPh);
      this.datosGraficaSuelo.datasets[0].label = 'medidaPh';
      this.datosGraficaSuelo.datasets[0].backgroundColor =
        this.getRandomColor();

      this.datosGraficaSuelo.datasets[1].data.push(element.materiaOrganica);
      this.datosGraficaSuelo.datasets[1].label = 'materiaOrganica';
      this.datosGraficaSuelo.datasets[1].backgroundColor =
        this.getRandomColor();

      this.datosGraficaSuelo.datasets[2].data.push(element.elementoK);
      this.datosGraficaSuelo.datasets[2].label = 'elementoK';
      this.datosGraficaSuelo.datasets[2].backgroundColor =
        this.getRandomColor();

      this.datosGraficaSuelo.datasets[3].data.push(element.elementoCa);
      this.datosGraficaSuelo.datasets[3].label = 'ElementoCa';
      this.datosGraficaSuelo.datasets[3].backgroundColor =
        this.getRandomColor();

      this.datosGraficaSuelo.datasets[4].data.push(element.elementoMg);
      this.datosGraficaSuelo.datasets[4].label = 'elementoMg';
      this.datosGraficaSuelo.datasets[4].backgroundColor =
        this.getRandomColor();

      this.datosGraficaSuelo.datasets[5].data.push(element.elementoNa);
      this.datosGraficaSuelo.datasets[5].label = 'elementoNa';
      this.datosGraficaSuelo.datasets[5].backgroundColor =
        this.getRandomColor();

      this.datosGraficaSuelo.datasets[6].data.push(element.elementoP);
      this.datosGraficaSuelo.datasets[6].label = 'elementoP';
      this.datosGraficaSuelo.datasets[6].backgroundColor =
        this.getRandomColor();

      this.datosGraficaSuelo.datasets[7].data.push(element.elementoN);
      this.datosGraficaSuelo.datasets[7].label = 'elementoN';
      this.datosGraficaSuelo.datasets[7].backgroundColor =
        this.getRandomColor();

      this.datosGraficaSuelo.datasets[8].data.push(element.elementoAl);
      this.datosGraficaSuelo.datasets[8].label = 'elementoN';
      this.datosGraficaSuelo.datasets[8].backgroundColor =
        this.getRandomColor();

      this.datosGraficaSuelo.datasets[9].data.push(element.elementoCo);
      this.datosGraficaSuelo.datasets[9].label = 'elementoCo';
      this.datosGraficaSuelo.datasets[9].backgroundColor =
        this.getRandomColor();

      this.datosGraficaSuelo.datasets[10].data.push(element.porcentajeMin);
      this.datosGraficaSuelo.datasets[10].label = 'porcentajeMin';
      this.datosGraficaSuelo.datasets[10].backgroundColor =
        this.getRandomColor();
    });
  }

  getDatosGraficaClima(datosClimaResponse: any) {
    console.log(datosClimaResponse);
    console.log(this.datosGraficaClima);

    datosClimaResponse.forEach((element: any) => {
      this.datosGraficaClima.labels.push(element.fecha);

      this.datosGraficaClima.datasets[0].data.push(element.temperatura);
      this.datosGraficaClima.datasets[0].label = 'temperatura';
      this.datosGraficaClima.datasets[0].backgroundColor =
        this.getRandomColor();

      this.datosGraficaClima.datasets[1].data.push(element.humedadRelativa);
      this.datosGraficaClima.datasets[1].label = 'humedadRelativa';
      this.datosGraficaClima.datasets[1].backgroundColor =
        this.getRandomColor();

      this.datosGraficaClima.datasets[2].data.push(element.precipitacion);
      this.datosGraficaClima.datasets[2].label = 'precipitacion';
      this.datosGraficaClima.datasets[2].backgroundColor =
        this.getRandomColor();

      this.datosGraficaClima.datasets[3].data.push(element.radiacionSolar);
      this.datosGraficaClima.datasets[3].label = 'radiacionSolar';
      this.datosGraficaClima.datasets[3].backgroundColor =
        this.getRandomColor();

      this.datosGraficaClima.datasets[4].data.push(element.direccionViento);
      this.datosGraficaClima.datasets[4].label = 'direccionViento';
      this.datosGraficaClima.datasets[4].backgroundColor =
        this.getRandomColor();

      this.datosGraficaClima.datasets[5].data.push(element.velocidadViento);
      this.datosGraficaClima.datasets[5].label = 'velocidadViento';
      this.datosGraficaClima.datasets[5].backgroundColor =
        this.getRandomColor();

      this.datosGraficaClima.datasets[6].data.push(element.humedadSuelo);
      this.datosGraficaClima.datasets[6].label = 'humedadSuelo';
      this.datosGraficaClima.datasets[6].backgroundColor =
        this.getRandomColor();

      this.datosGraficaClima.datasets[7].data.push(element.temperaturaSuelo);
      this.datosGraficaClima.datasets[7].label = 'temperaturaSuelo';
      this.datosGraficaClima.datasets[7].backgroundColor =
        this.getRandomColor();
    });
  }

  getDatosGraficaFruto(datosFrutoResponse: any) {
    console.log(datosFrutoResponse);
    console.log(this.datosGraficaFruto);

    datosFrutoResponse.forEach((element: any) => {
      this.datosGraficaFruto.labels.push(element.fecha);

      this.datosGraficaFruto.datasets[0].data.push(element.tamano);
      this.datosGraficaFruto.datasets[0].label = 'tamano';
      this.datosGraficaFruto.datasets[0].backgroundColor =
        this.getRandomColor();

      this.datosGraficaFruto.datasets[1].data.push(element.materiaSeca);
      this.datosGraficaFruto.datasets[1].label = 'materiaSeca';
      this.datosGraficaFruto.datasets[1].backgroundColor =
        this.getRandomColor();

      this.datosGraficaFruto.datasets[2].data.push(element.contenidoHumedad);
      this.datosGraficaFruto.datasets[2].label = 'contenidoHumedad';
      this.datosGraficaFruto.datasets[2].backgroundColor =
        this.getRandomColor();

      this.datosGraficaFruto.datasets[3].data.push(element.elementoCa);
      this.datosGraficaFruto.datasets[3].label = 'elementoCa';
      this.datosGraficaFruto.datasets[3].backgroundColor =
        this.getRandomColor();

      this.datosGraficaFruto.datasets[4].data.push(element.clasificacionCf);
      this.datosGraficaFruto.datasets[4].label = 'clasificacionCf';
      this.datosGraficaFruto.datasets[4].backgroundColor =
        this.getRandomColor();
    });
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

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
        this.infoFincaService.addControlSuelo(this.estudiosSuelo).subscribe({
          next: (response: any) => {
            this.toast.fire({
              icon: 'success',
              title: 'Estudios agregados correctamente',
            });
            this.getListaControlSuelo();
            this.estudiosSuelo = [];
          },
          error: (error: any) => {
            this.toast.fire({
              icon: 'error',
              title: 'Error al agregar estudios',
            });
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
    console.log('entra a clima');
    const files = $event.target.files;
    if (!files.length) {
      return;
    }
    const file = files[0];
    this.convertToArrayBuffer(file).then(
      (data) => {
        this.estudiosClima = data;
        console.log(this.estudiosClima);
        this.infoFincaService.addControlClima(this.estudiosClima).subscribe({
          next: (response: any) => {
            this.toast.fire({
              icon: 'success',
              title: 'Estudios agregados correctamente',
            });
            this.getListaControlClima();
            this.estudiosClima = [];
          },
          error: (error: any) => {
            this.toast.fire({
              icon: 'error',
              title: 'Error al agregar estudios',
            });
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
        this.infoFincaService.addControlFruto(this.estudiosFruto).subscribe({
          next: (response: any) => {
            this.toast.fire({
              icon: 'success',
              title: 'Estudios agregados correctamente',
            });
            console.log(response);
            this.getListaControlClima();
            this.estudiosFruto = [];
          },
          error: (error: any) => {
            this.toast.fire({
              icon: 'error',
              title: 'Error al agregar estudios',
            });
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
        this.listaControlFruto = new MatTableDataSource<ControlFruto[]>(
          response
        );
        this.listaControlFruto.paginator = this.paginator;

        this.paginator._intl.itemsPerPageLabel = 'items por pagina';
        this.getDatosGraficaFruto(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getListaControlClima() {
    this.infoFincaService.getControlClima(this.idState).subscribe({
      next: (response: any) => {
        this.listaControlClima = new MatTableDataSource<ControlClima[]>(
          response
        );
        this.listaControlClima.paginator = this.paginator;

        this.paginator._intl.itemsPerPageLabel = 'items por pagina';
        this.getDatosGraficaClima(response);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  getListaControlSuelo() {
    this.infoFincaService.getControlSuelo(this.idState).subscribe({
      next: (response: any) => {
        this.listaControlSuelo = new MatTableDataSource<ControlSuelo[]>(
          response
        );
        this.listaControlSuelo.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'items por pagina';
        this.getDatosGraficaSuelo(response);
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
