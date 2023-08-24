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

@NgModule({
  declarations: [StateComponent, RegistryStateComponent],
  imports: [
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
    ]),
  ],
})
export class StateModule {}
