import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

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
  {
    path: 'finca',
    loadChildren: () =>
      import('./screens/state/state.module').then((m) => m.StateModule),
  },
  { path: 'barra', component: NavigationBarComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
