import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModeloService {
  constructor(private http: HttpClient) {}

  getModeloTodos(): Observable<any> {
    return this.http.get('http://201.131.90.170:5000/modelo-todos');
  }

  getModeloSolo(id: number): Observable<any> {
    return this.http.get(
      'http://201.131.90.170:5000/modelo-solo?finca_id=' + id
    );
  }
}
