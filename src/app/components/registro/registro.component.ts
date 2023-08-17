import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Productor } from 'src/app/modelo/productor';
import { ProductorService } from 'src/app/services/productor.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  public productor: Productor = new Productor();
  public hide: Boolean = true;

  constructor(
    private productorService: ProductorService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registro() {
    this.productorService.registro(this.productor);
    this.router.navigate(['login']);
  }
}
