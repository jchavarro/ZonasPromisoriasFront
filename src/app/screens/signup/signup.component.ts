import { Component } from '@angular/core';
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
  public productor: Productor = new Productor();
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

  constructor(
    private productorService: ProductorService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registro() {
    this.productorService.registro(this.productor).subscribe({
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
          title: 'Error al registrar productor',
        });
      },
    });
  }
}
