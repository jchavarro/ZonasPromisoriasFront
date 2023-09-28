import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Finca } from 'src/app/classes/finca';
import { Productor } from 'src/app/classes/productor';
import { Observable } from 'rxjs';
import { Coordenadas } from '../classes/coordenadas';
import { Lote } from '../classes/lote';

@Injectable({
  providedIn: 'root',
})
export class FincaService {
  constructor(private http: HttpClient) {}

  getFinca(id: number): Observable<Finca> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<Finca>(
      environment.url_base + 'api/v1/finca?idcatastral=' + id,
      { headers }
    );
  }

  getFincas(): any {
    console.log(localStorage.getItem('user_id'));
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<Finca[]>(
      environment.url_base +
        'api/v1/finca/all?idproductor=' +
        localStorage.getItem('user_id'),
      { headers }
    );
  }

  getCoordenadas(id: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get(
      environment.url_base + 'api/v1/coordenadas/finca?idcatastral=' + id,
      { headers }
    );
  }

  getAllCoordenadas(): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get(environment.url_base + 'api/v1/coordenadas/all', {
      headers,
    });
  }

  addFinca(registroFinca: Finca, imagenFinca: any) {
    const nitProductor = localStorage.getItem('user_id');
    const productor: Productor = new Productor();
    productor.nitProductor = Number(nitProductor);
    registroFinca.productor = productor;
    if (imagenFinca == null) {
      imagenFinca = new File([], 'nofound');
    }
    console.log(imagenFinca);
    const registroFincaJSON = new Blob([JSON.stringify(registroFinca)], {
      type: 'application/json',
    });

    const formDataFinca: FormData = new FormData();
    formDataFinca.append('finca', registroFincaJSON);
    formDataFinca.append('imagenFinca', imagenFinca);

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.post(
      environment.url_base + 'api/v1/finca',
      formDataFinca,
      {
        headers,
      }
    );
  }

  addLote(lote: Lote) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(environment.url_base + 'api/v1/lote', lote, {
      headers,
    });
  }

  addCoordenadas(coordenadas: Coordenadas) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const coordenadasList: Coordenadas[] = [];
    coordenadasList.push(coordenadas);
    return this.http.post(
      environment.url_base + 'api/v1/coordenadas',
      coordenadasList,
      { headers }
    );
  }

  deleteFinca(id: number) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.delete(
      environment.url_base + 'api/v1/finca?idcatastral=' + id,
      { headers }
    );
  }
}
