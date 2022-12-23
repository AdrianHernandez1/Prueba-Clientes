import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { DetalleCComponent } from './pages/detalle-c_Editar_Eliminar/detalle-c.component';
import { CatalogoCComponent } from './pages/catalogo-c/catalogo-c.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { HttpClientModule } from '@angular/common/http';
import { DetalleCGuardarComponent } from './pages/detalle-c-guardar/detalle-c-guardar.component';


@NgModule({
  declarations: [
    DetalleCComponent,
    CatalogoCComponent,
    DetalleCGuardarComponent
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
    DetalleCGuardarComponent,
    PrimeNgModule,
    CommonModule
    

       
  ]
  
})
export class AuthModule { }
