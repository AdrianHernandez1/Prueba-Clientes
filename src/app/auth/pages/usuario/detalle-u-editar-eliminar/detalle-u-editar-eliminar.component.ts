import { Component } from '@angular/core';
import { User, InterfazUsuario } from '../../../interfaces/usuarios.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-u-editar-eliminar',
  templateUrl: './detalle-u-editar-eliminar.component.html'})
export class DetalleUEditarEliminarComponent {
 
  usuarios!: User;
  usuarios2!: InterfazUsuario;

  constructor(private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    if (!this.router.url.includes('editarUsuario')) {
      return;
    }
    this.activatedRoute.params
      .pipe(
        switchMap(({ idUser }) => this.authService.getUsuarioPorId(idUser))
      )
      .subscribe(usuarios => this.usuarios = usuarios);
  }

  registro() {
    if (this.usuarios.idUser === 0) {
      return;
    }
    if (this.usuarios.idUser ) {
      //Actualizar 
      this.authService.actualizarCliente(this.usuarios)
        .subscribe(cliente => {
          this.router.navigate(["/auth/catalogoCliente"]);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se actualizo el cliente con exito',
            showConfirmButton: false,
            timer: 1500
          })
        }, (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Verifica que tus campos cumplan no esten vacios y cumplan con el ejemplo solicitado'
          })
        });
    }
  }

  Buscar() {
    Swal.fire({
      icon: 'info',
      title: 'Esta función no se encuentra activa',
      showConfirmButton: false,
      timer: 1500
    });
  }
}
