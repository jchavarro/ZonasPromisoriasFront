import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Finca } from 'src/app/classes/finca';
import { Productor } from 'src/app/classes/productor';
import { Observable } from 'rxjs';

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

  addFinca(registroFinca: Finca) {
    const nitProductor = localStorage.getItem('user_id');
    const productor: Productor = new Productor();
    productor.nitProductor = Number(nitProductor);
    registroFinca.productor = productor;
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(
      environment.url_base + 'api/v1/finca',
      registroFinca,
      {
        headers,
      }
    );
  }
}
