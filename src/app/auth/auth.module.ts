import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { DetalleCComponent } from './pages/detalle-c/detalle-c.component';
import { CatalogoCComponent } from './pages/catalogo-c/catalogo-c.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    DetalleCComponent,
    CatalogoCComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    PrimeNgModule,
    HttpClientModule,
    FormsModule,
    NgFor 
  
  ],
  exports:[
    DetalleCComponent,
    CatalogoCComponent,
    PrimeNgModule,
    CommonModule,

       
  ]
  
})
export class AuthModule { }
