import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DatosPublicosComponent } from './components/datos-publicos/datos-publicos.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'datos-publicos', component: DatosPublicosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
