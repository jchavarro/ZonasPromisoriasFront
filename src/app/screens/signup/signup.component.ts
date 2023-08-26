import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Productor } from 'src/app/classes/productor';
import { ProductorService } from 'src/app/services/productor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  public hide: Boolean = true;

  public form = new FormGroup({
    nombreProductor: new FormControl('', Validators.required),
    apellidosProductor: new FormControl(''),
    nitProductor: new FormControl('', Validators.required),
    direccionProductor: new FormControl(''),
    telefonoProductor: new FormControl(''),
    observacionesProductor: new FormControl(''),
    nombreUsuario: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
  });

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

  constructor(
    private productorService: ProductorService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registro() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.productorService.registro(this.form.value as Productor).subscribe({
      next: (response: any) => {
        this.toast.fire({
          icon: 'success',
          title: 'Productor registrado exitosamente',
        });
        this.router.navigate(['login']);
      },
      error: (error) => {
        this.toast.fire({
          icon: 'error',
          title: error.error.mensaje,
        });
      },
    });
  }
}
