import { Component, ElementRef, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic.js';
import Point from '@arcgis/core/geometry/Point';
import { FincaService } from 'src/app/services/finca.service';
import { Coordenadas } from 'src/app/classes/coordenadas';
import { ModeloService } from 'src/app/services/modelo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proareas',
  templateUrl: './proareas.component.html',
  styleUrls: ['./proareas.component.css'],
})
export class ProareasComponent {
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
  private map: Map = new Map({ basemap: 'streets-vector' });

  coordenadas: Coordenadas[] = [];

  private view: MapView = new MapView({
    center: [-75.865748, 4.942948],
    zoom: 8,
    map: this.map,
  });

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

  constructor(
    private fincaService: FincaService,
    private modeloService: ModeloService
  ) {}

  ngOnInit(): void {
    this.view.container = this.mapViewEl.nativeElement;
    this.agregarPuntos();
  }

  agregarPuntos() {
    this.fincaService.getAllCoordenadas().subscribe({
      next: (res: Coordenadas[]) => {
        this.coordenadas = res;
        console.log(this.coordenadas);
        this.modeloService.getModeloTodos().subscribe({
          next: (res: any) => {
            console.log(res);
            this.coordenadas.forEach((coordenada) => {
              res.forEach((modelo: any) => {
                if (coordenada.idCatastral === modelo.idFinca) {
                  var point = new Point({
                    longitude: coordenada.coordenadaX,
                    latitude: coordenada.coordenadaY,
                  });
                  const markerSymbol = {
                    type: 'simple-marker',
                    color: this.calcularColor(modelo.prediccion),
                    outline: {
                      color: [255, 255, 255],
                      width: 3,
                    },
                  };
                  const pointGraphic = new Graphic({
                    geometry: point,
                    symbol: markerSymbol,
                  });
                  this.view.graphics.add(pointGraphic);
                }
              });
            });
          },
          error: (error: any) => {
            this.toast.fire({
              icon: 'error',
              title: 'Error al correr el modelo de IA',
            });
          },
        });
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  calcularColor(prediccion: number) {
    switch (true) {
      case (prediccion >= 0 && prediccion <= 18.5) ||
        (prediccion >= 38.6 && prediccion <= 100):
        return '#F2726F';
      case (prediccion > 18.6 && prediccion < 23.5) ||
        (prediccion > 33.5 && prediccion < 38.5):
        return '#FFC533';
      case prediccion >= 23.5 && prediccion <= 33.5:
        return '#62B58F';
      default:
        return '#000000';
    }
  }
}
