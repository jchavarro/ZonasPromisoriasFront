import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DatosPublicosComponent } from './components/publicdata/datos-publicos.component';
import { RegistroComponent } from './components/signup/registro.component';
import { FincaComponent } from './components/state/finca.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./screens/login/login.module').then((m) => m.LoginModule),
  },
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
