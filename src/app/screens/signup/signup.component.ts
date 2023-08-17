import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Productor } from 'src/app/classes/productor';
import { ProductorService } from 'src/app/services/productor.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
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
