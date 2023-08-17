import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  {
    path: 'datos-publicos',
    loadChildren: () =>
      import('./screens/publicdata/publicdata.module').then(
        (m) => m.PublicdataModule
      ),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./screens/signup/signup.module').then((m) => m.SignupModule),
  },
  { path: 'finca', component: FincaComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
