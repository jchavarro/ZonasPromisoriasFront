import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InfoFincaService {
  constructor(private http: HttpClient) {}

  getControlSuelo(idcatastral: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get(
      environment.url_base + 'api/v1/suelo?idcatastral=' + idcatastral,
      {
        headers,
      }
    );
  }

  getControlClima(idcatastral: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get(
      environment.url_base + 'api/v1/clima?idcatastral=' + idcatastral,
      {
        headers,
      }
    );
  }

  getControlFruto(idcatastral: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get(
      environment.url_base + 'api/v1/fruto?idcatastral=' + idcatastral,
      {
        headers,
      }
    );
  }
}
