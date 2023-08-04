import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(
    private http: HttpClient
  ) { }

  login(usuario: string, password: string) {

    const credentials = btoa('USER_CLIENT_APP:admin');

    const body = new FormData();
    body.append('grant_type', 'password');
    body.append('username', usuario);
    body.append('password', password);

    const headers = new HttpHeaders({
      Authorization: `Basic ${credentials}`
    });

    return this.http.post(environment.url_base + 'oauth/token', body, { headers }).subscribe(
      (response: any) => {
        console.log(response);
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('token_type', response.token_type);
      },
      (error) => {
        console.log(error);
      });

  }

}
