import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Finca } from 'src/app/classes/finca';
import { FincaService } from 'src/app/services/finca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registry-state',
  templateUrl: './registry-state.component.html',
  styleUrls: ['./registry-state.component.css'],
})
export class RegistryStateComponent {
  public registroFinca: Finca = new Finca();
  public srcResult: any;

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

  constructor(private fincaService: FincaService, private router: Router) {}

  ngOnInit() {}

  addFinca() {
    this.fincaService.addFinca(this.registroFinca).subscribe({
      next: (response: any) => {
        this.toast.fire({
          icon: 'success',
          title: 'Registro de finca exitoso',
        });
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
        this.toast.fire({
          icon: 'error',
          title: 'Registro de finca fallido',
        });
      },
    });
    this.registroFinca = new Finca();
    this.router.navigate(['/finca']);
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
      console.log(inputNode.files[0]);
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
