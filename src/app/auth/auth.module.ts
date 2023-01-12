import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { DetalleCComponent } from './pages/detalle-c_Editar_Eliminar/detalle-c.component';
import { CatalogoCComponent } from './pages/catalogo-c/catalogo-c.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { HttpClientModule } from '@angular/common/http';
import { DetalleCGuardarComponent } from './pages/detalle-c-guardar/detalle-c-guardar.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { BitacoraComponent } from './pages/bitacora/bitacora.component';
import { CatalogoUComponent } from './pages/usuario/catalogo-u/catalogo-u.component';
import { DetalleUComponent } from './pages/usuario/detalle-u/detalle-u.component';
import { DetalleUEditarEliminarComponent } from './pages/usuario/detalle-u-editar-eliminar/detalle-u-editar-eliminar.component';


@NgModule({
  declarations: [
    DetalleCComponent,
    CatalogoCComponent,
    DetalleCGuardarComponent,
    LoginComponent,
    MenuComponent,
    BitacoraComponent,
    CatalogoUComponent,
    DetalleUComponent,
    DetalleUEditarEliminarComponent  ],
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
