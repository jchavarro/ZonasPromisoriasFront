import { Component, ElementRef, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic.js';
import Point from '@arcgis/core/geometry/Point';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Finca } from 'src/app/classes/finca';
import { FincaService } from 'src/app/services/finca.service';

@Component({
  selector: 'app-detailstate',
  templateUrl: './detailstate.component.html',
  styleUrls: ['./detailstate.component.css'],
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

  ngOnInit(): void {
    this.view.container = this.mapViewEl.nativeElement;
    this.agregarPunto();
    this.idState = Number(this.route.snapshot.paramMap.get('id'));
    this.getFinca();
  }

  constructor(
    private route: ActivatedRoute,
    private service: FincaService,
    private readonly router: Router
  ) {}

  getFinca(): void {
    this.service.getFinca(this.idState).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: any) => {
        this.router.navigate(['/finca']);
      },
    });
  }

  agregarPunto() {
    // First create a point geometry
    var point = new Point({
      longitude: -75.606005,
      latitude: 4.742948,
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
}
