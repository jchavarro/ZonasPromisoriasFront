import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ControlFruto } from '../classes/control-fruto';
import { ControlClima } from '../classes/control-clima';
import { ControlSuelo } from '../classes/control-suelo';

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

  async getControlClima(idcatastral: number): Promise<Observable<any>> {
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
  addControlSuelo(estudiosSuelo: ControlSuelo[]) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(
      environment.url_base + 'api/v1/suelo',
      estudiosSuelo,
      { headers }
    );
  }

  addControlClima(estudiosClima: ControlClima[]) {
    console.log(estudiosClima);
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(
      environment.url_base + 'api/v1/clima',
      estudiosClima,
      { headers }
    );
  }

  addControlFruto(estudiosFruto: ControlFruto[]) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(
      environment.url_base + 'api/v1/fruto',
      estudiosFruto,
      { headers }
    );
  }
}
