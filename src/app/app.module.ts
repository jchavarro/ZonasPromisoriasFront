import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { InicioComponent } from './components/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { DatosPublicosComponent } from './components/datos-publicos/datos-publicos.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    DatosPublicosComponent,
  ],
  imports: [
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
