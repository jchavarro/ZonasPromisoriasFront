import { Component } from '@angular/core';
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

  constructor(private loginService: LoginService) {}

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
}
