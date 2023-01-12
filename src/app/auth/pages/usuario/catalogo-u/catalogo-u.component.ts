import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { AuthService } from 'src/app/auth/services/auth.service';
import { InterfazUsuario, User } from '../../../interfaces/usuarios.interface';
import Swal from 'sweetalert2';
import *as XLSX from 'xlsx';
@Component({
  selector: 'app-catalogo-u',
  templateUrl: './catalogo-u.component.html',
  styles: [
    `
    .inputBuscar {
      border-radius: 10px;
      width: 500px;
   }

    `
  ]
})
export class CatalogoUComponent {
  @ViewChild('datoTabla', { static: false }) el!: ElementRef;
  usuariosDatos!: InterfazUsuario;
  hayError: boolean = false;
  excel = 'DatosUsuarios.xlsx';
  termino: String = "";
  dato: string = "";
  usuarios!: InterfazUsuario[];


  constructor(
    private authService: AuthService,
    private router: Router,
  ) {

  }
  ngOnInit() {
    this.getAllClientes();
    // this.buscar();
  }

  getAllClientes() {
    this.authService.getAllUsuario()
      .subscribe((user) => {
        this.usuariosDatos = user;
        console.log(user);
      }, (error) => {
        console.log(error);
      }
      )
  }

  borrarUsuario(usuraio: User) {
    Swal.fire({
      title: '¿Estas seguro de eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.borrarUsuario(usuraio)
          .subscribe(resp => {
            this.ngOnInit();
          });
        Swal.fire(
          'Eliminado!',
          'El cliente se elimino con exito',
          'success'
        )
      }
    }
    )
  }

  buscar() {
    this.hayError = false;
    this.termino = this.dato;
    this.authService.buscarUsuario(this.dato)
      .subscribe((usuarios) => {
        this.usuariosDatos = usuarios;
      }, (err) => {
        this.hayError = true;
        this.usuarios = [];
      })
  }



  imprimirLista() {
    let pdf = new jsPDF('p', 'mm', [1500, 1500]);
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('Tabla de usuarios');
      }
    });
  }

  exportarExcel(): void {
    let element = document.getElementById('datoTabla');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.excel);
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


