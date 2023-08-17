import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DatosPublicosService {
  constructor(private http: HttpClient) {}

  getControlSuelo(): Observable<any> {
    return this.http.get(environment.url_base + 'api/v1/suelo/all');
  }

  getControlClima(): Observable<any> {
    return this.http.get(environment.url_base + 'api/v1/clima/all');
  }

  getControlFruto(): Observable<any> {
    return this.http.get(environment.url_base + 'api/v1/fruto/all');
  }
}
