import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosPublicosService {


  constructor(
    private http: HttpClient
  ) { }

  getControlSuelo() : Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `${localStorage.getItem('token_type')} ${localStorage.getItem('token')}`
    });
    console.log(headers);
    return this.http.get(environment.url_base + 'api/v1/suelo/all', { headers });
  }
}
