import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PublicdataComponent } from './publicdata.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [PublicdataComponent],
  imports: [
    MatPaginatorModule,
    MatTableModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PublicdataComponent,
      },
    ]),
  ],
})
export class PublicdataModule {}
