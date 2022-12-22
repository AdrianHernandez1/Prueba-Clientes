import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoCComponent } from './pages/catalogo-c/catalogo-c.component';
import { DetalleCComponent } from './pages/detalle-c/detalle-c.component';

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
      path: 'editarCliente/:id',
      component: DetalleCComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
