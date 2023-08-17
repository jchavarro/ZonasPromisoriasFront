import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DatosPublicosComponent } from './components/datos-publicos/datos-publicos.component';
import { RegistroComponent } from './components/registro/registro.component';
import { FincaComponent } from './components/finca/finca.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    loadChildren: () =>
      import('./screens/home/home.module').then((m) => m.HomeModule),
  },
  { path: 'datos-publicos', component: DatosPublicosComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'finca', component: FincaComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
