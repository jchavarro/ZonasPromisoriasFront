import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Productor } from 'src/app/classes/productor';

@Injectable({
  providedIn: 'root',
})
export class ProductorService {
  constructor(private http: HttpClient) {}

  registro(productor: Productor) {
    return this.http.post(
      environment.url_base + 'api/v1/productor/registro',
      productor
    );
  }
}
