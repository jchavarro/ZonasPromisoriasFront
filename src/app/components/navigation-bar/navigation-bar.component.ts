import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent {
  constructor(private router: Router) {}

  irDatosPublicos() {
    this.router.navigate(['datos-publicos']);
  }

  irHome() {
    this.router.navigate(['']);
  }

  irLogin() {
    this.router.navigate(['login']);
  }

  irRegistro() {
    this.router.navigate(['registro']);
  }

  isLogin() {
    return localStorage.getItem('token') == null;
  }

  irFincas() {
    this.router.navigate(['finca']);
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
