import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/loginService/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  
  public usuario!: string;

  public contrasena!: string;

  public hide: Boolean = true;
  ngOnInit(): void {
  }

  constructor(
    private loginService: LoginService,
    ) {}

  public onSubmit() {
    this.loginService.login(this.usuario, this.contrasena)
    console.log(this.usuario);
    console.log(this.contrasena);
  }

  public mostrarLogin() {
    console.log(this.usuario);
    console.log(this.contrasena);
  }
}
