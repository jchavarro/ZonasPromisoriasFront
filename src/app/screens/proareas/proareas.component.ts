import { Component, ElementRef, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic.js';
import Point from '@arcgis/core/geometry/Point';
import { FincaService } from 'src/app/services/finca.service';
import { Coordenadas } from 'src/app/classes/coordenadas';

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

  constructor(private fincaService: FincaService) {}

  ngOnInit(): void {
    this.view.container = this.mapViewEl.nativeElement;
    this.agregarPuntos();
  }

  agregarPuntos() {
    this.fincaService.getAllCoordenadas().subscribe({
      next: (res: Coordenadas[]) => {
        this.coordenadas = res;
        console.log(res);
        for (let i = 0; i < this.coordenadas.length; i++) {
          var point = new Point({
            longitude: this.coordenadas[i].coordenadaX,
            latitude: this.coordenadas[i].coordenadaY,
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
        }
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
