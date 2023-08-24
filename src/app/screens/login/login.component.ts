import { ViewEncapsulation } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public usuario!: string;

  public contrasena!: string;

  public hide: Boolean = true;

  private toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  ngOnInit(): void {}

  constructor(private loginService: LoginService, private router: Router) {}

  public onSubmit() {
    this.loginService.login(this.usuario, this.contrasena).subscribe({
      next: (response: any) => {
        this.toast.fire({
          icon: 'success',
          title: 'Inicio de sesion exitoso',
        });
        console.log(response);
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('token_type', response.token_type);
        localStorage.setItem('user_id', response.user_id);
        this.irfinca();
      },
      error: (error) => {
        const title =
          error.error.error === 'invalid_grant'
            ? 'Credenciales incorrectas'
            : error.error.error_description;
        console.log(error);
        this.toast.fire({
          icon: 'error',
          title,
        });
      },
    });
  }

  irfinca() {
    this.router.navigate(['finca']);
  }
}
