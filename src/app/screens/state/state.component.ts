import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Finca } from 'src/app/classes/finca';
import { FincaService } from 'src/app/services/finca.service';
import { RegistryStateComponent } from './components/registry-state/registry-state.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css'],
})
export class StateComponent {
  public fincas: any[] = [];
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

  constructor(
    private fincaService: FincaService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.getFincas();
  }

  getFincas() {
    this.fincaService.getFincas().subscribe({
      next: (res: any) => {
        this.fincas = res;
        console.log(res);
      },
      error: (error: any) => {
        console.log(error);
        this.toast.fire({
          icon: 'error',
          title: 'No existen fincas para mostrar',
        });
      },
    });
  }

  addFinca() {
    this.fincaService.addFinca(this.registroFinca);
    this.registroFinca = new Finca();
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

  openDialog() {
    const dialogRef = this.dialog.open(RegistryStateComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  detailState(idCatastral: number) {
    this.router.navigate(['detalle']);
  }
}
