import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Finca } from 'src/app/modelo/finca';

@Injectable({
  providedIn: 'root',
})
export class FincaService {
  constructor(private http: HttpClient) {}

  getFincas() {
    console.log(localStorage.getItem('user_id'));
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http
      .get(
        environment.url_base +
          'api/v1/finca/all?idproductor=' +
          localStorage.getItem('user_id'),
        { headers }
      )
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (err: any) => {
          console.log(err);
        }
      );
  }
  addFinca(registroFinca: Finca) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http
      .post(environment.url_base + 'api/v1/finca', registroFinca, {
        headers,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (err: any) => {
          console.log(err);
        }
      );
  }
}
