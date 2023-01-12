import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent {
constructor(private router: Router,
  private authService: AuthService){}

usuario:any;
nombre=localStorage.getItem("usuario");


  ngOnInit() {
    this.usuario=this.nombre;
  }

  cerrarSesion(){
    Swal.fire({
      title: '¿Estas seguro de cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar sesión!'
      }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      }
    }
    )

  }
}
