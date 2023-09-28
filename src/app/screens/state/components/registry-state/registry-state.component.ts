import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Coordenadas } from 'src/app/classes/coordenadas';
import { Finca } from 'src/app/classes/finca';
import { FincaRequest } from 'src/app/classes/finca-request';
import { Lote } from 'src/app/classes/lote';
import { FincaService } from 'src/app/services/finca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registry-state',
  templateUrl: './registry-state.component.html',
  styleUrls: ['./registry-state.component.css'],
})
export class RegistryStateComponent {
  public registroFinca: FincaRequest = new FincaRequest();
  public srcResult: any;
  public selectedFile: File | null = null;
  public coordenadas: Coordenadas = new Coordenadas();
  public lote: Lote = new Lote();

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
    private fincaService: FincaService,
    private router: Router,
    private dialogRef: MatDialogRef<RegistryStateComponent>
  ) {}

  ngOnInit() {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addFinca() {
    console.log(this.registroFinca);
    this.fincaService
      .addFinca(this.registroFinca, this.selectedFile)
      .subscribe({
        next: (response: any) => {
          this.toast.fire({
            icon: 'success',
            title: 'Registro de finca exitoso',
          });
          this.registroFinca = new Finca();
          console.log(response);
          this.dialogRef.close(true);

          this.lote.numeroLote = 1;
          this.lote.nombreLote = 'Lote 1';

          this.fincaService.addLote(this.lote).subscribe({
            next: (response: any) => {
              this.toast.fire({
                icon: 'success',
                title: 'Registro de lote exitoso',
              });
              console.log(response);

              this.coordenadas.numeroLote = 1;

              this.fincaService.addCoordenadas(this.coordenadas).subscribe({
                next: (response: any) => {
                  this.toast.fire({
                    icon: 'success',
                    title: 'Registro de coordenadas exitoso',
                  });
                  console.log(response);
                },
                error: (error: any) => {
                  console.log(error);
                  this.toast.fire({
                    icon: 'error',
                    title: 'Registro de coordenadas fallido',
                  });
                  this.dialogRef.close(false);
                },
              });
            },
            error: (error: any) => {
              console.log(error);
              this.toast.fire({
                icon: 'error',
                title: 'Registro de lote fallido',
              });
              this.dialogRef.close(false);
            },
          });
        },
        error: (error: any) => {
          console.log(error);
          this.toast.fire({
            icon: 'error',
            title: 'Registro de finca fallido',
          });
          this.dialogRef.close(false);
        },
      });

    this.router.navigate(['/finca']);
  }
}
