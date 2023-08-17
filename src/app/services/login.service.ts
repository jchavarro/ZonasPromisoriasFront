import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Productor } from 'src/app/classes/productor';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(usuario: string, password: string) {
    const credentials = btoa('USER_CLIENT_APP:admin');

    const body = new FormData();
    body.append('grant_type', 'password');
    body.append('username', usuario);
    body.append('password', password);

    const headers = new HttpHeaders({
      Authorization: `Basic ${credentials}`,
    });

    return this.http.post(environment.url_base + 'oauth/token', body, {
      headers,
    });
  }
}
