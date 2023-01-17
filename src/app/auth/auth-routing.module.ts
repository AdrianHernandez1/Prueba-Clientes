import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoCComponent } from './pages/catalogo-c/catalogo-c.component';
import { DetalleCComponent } from './pages/detalle-c_Editar_Eliminar/detalle-c.component';
import { DetalleCGuardarComponent } from './pages/detalle-c-guardar/detalle-c-guardar.component';
import { BitacoraComponent } from './pages/bitacora/bitacora.component';
import { CatalogoUComponent } from './pages/usuario/catalogo-u/catalogo-u.component';
import { DetalleUComponent } from './pages/usuario/detalle-u/detalle-u.component';
import { LoginComponent } from './pages/login/login.component';
import { DetalleUEditarEliminarComponent } from './pages/usuario/detalle-u-editar-eliminar/detalle-u-editar-eliminar.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
