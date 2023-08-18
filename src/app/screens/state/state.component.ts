import { Component } from '@angular/core';
import { Finca } from 'src/app/classes/finca';
import { FincaService } from 'src/app/services/finca.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css'],
})
export class StateComponent {
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
      console.log(inputNode.files[0]);
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
