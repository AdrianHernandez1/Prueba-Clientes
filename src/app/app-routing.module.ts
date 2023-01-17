import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleCComponent } from './auth/pages/detalle-c_Editar_Eliminar/detalle-c.component';
import { DetalleCGuardarComponent } from './auth/pages/detalle-c-guardar/detalle-c-guardar.component';
import { CatalogoCComponent } from './auth/pages/catalogo-c/catalogo-c.component';
import { BitacoraComponent } from './auth/pages/bitacora/bitacora.component';
import { CatalogoUComponent } from './auth/pages/usuario/catalogo-u/catalogo-u.component';
import { DetalleUComponent } from './auth/pages/usuario/detalle-u/detalle-u.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { DetalleUEditarEliminarComponent } from './auth/pages/usuario/detalle-u-editar-eliminar/detalle-u-editar-eliminar.component';
import { RedireccionComponent } from './auth/pages/redireccion/redireccion.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    
  },
  {
    path: 'redireccion',
    component: RedireccionComponent,
    
  },
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
    path: 'bitacora',
    component: BitacoraComponent
  },
  
  {
    path: 'catalogoUsuario',
    component: CatalogoUComponent
  },
  
  {
    path: 'detalleUsuario',
    component: DetalleUComponent
  },
  {
    path: 'editarCliente/:idCustomer',
    component: DetalleCComponent
  },
  
  {
    path: 'editarUsuario/:idUser',
    component: DetalleUEditarEliminarComponent
  },
  {
    path: '**',
    redirectTo: 'redireccion'
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
