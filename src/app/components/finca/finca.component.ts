import { Component } from '@angular/core';
import { Finca } from 'src/app/modelo/finca';
import { FincaService } from 'src/app/services/finca/finca.service';

@Component({
  selector: 'app-finca',
  templateUrl: './finca.component.html',
  styleUrls: ['./finca.component.css'],
})
export class FincaComponent {
  public fincas: any = [];
  public registroFinca: Finca = new Finca();
  public srcResult: any;

  constructor(private fincaService: FincaService) {}

  ngOnInit() {}

  getFincas() {
    this.fincas = this.fincaService.getFincas();
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

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
