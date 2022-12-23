import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleCComponent } from './auth/pages/detalle-c_Editar_Eliminar/detalle-c.component';
import { DetalleCGuardarComponent } from './auth/pages/detalle-c-guardar/detalle-c-guardar.component';
import { CatalogoCComponent } from './auth/pages/catalogo-c/catalogo-c.component';

const routes: Routes = [

  {
    path: 'catalogoCliente',
    component: CatalogoCComponent,
 },
 {
  path: 'detalleCliente', 
  component: DetalleCComponent
 },
 
 {
  path: 'detalleClienteGuardar', 
  component: DetalleCGuardarComponent
 },
{
      path: 'editarCliente/:id',
      component: DetalleCComponent
},
  {
    path: '**',
    redirectTo: 'catalogoCliente'
  }
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
