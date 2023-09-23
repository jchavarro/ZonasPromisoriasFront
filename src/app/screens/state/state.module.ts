import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StateComponent } from './state.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RegistryStateComponent } from './components/registry-state/registry-state.component';
import { DetailstateComponent } from './components/detailstate/detailstate.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ChartModule } from 'primeng/chart';
import { IaModelComponent } from './components/ia-model/ia-model.component';

@NgModule({
  declarations: [StateComponent, RegistryStateComponent, DetailstateComponent, IaModelComponent],
  imports: [
    ChartModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: StateComponent,
      },
      {
        path: 'detalle',
        component: DetailstateComponent,
      },
    ]),
  ],
})
export class StateModule {}
