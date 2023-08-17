import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Productor } from 'src/app/modelo/productor';

@Injectable({
  providedIn: 'root',
})
export class ProductorService {
  constructor(private http: HttpClient) {}

  registro(productor: Productor) {
    return this.http
      .post(environment.url_base + 'api/v1/productor/registro', productor)
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
