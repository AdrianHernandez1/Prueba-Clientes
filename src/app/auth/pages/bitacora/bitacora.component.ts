import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InterfazBitacora } from '../../interfaces/bitacora.interfaces';
import { AuthService } from '../../services/auth.service';
import jsPDF from 'jspdf';
import *as XLSX from 'xlsx';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styles: [
    `
    .inputBuscar {
      border-radius: 10px;
      width: 500px;
   }

   
    `
  ]
})
export class BitacoraComponent {
  @ViewChild('datoTabla', { static: false }) el!: ElementRef;
  bitacoraDatos!: InterfazBitacora;
  hayError: boolean = false;
  excel = 'DatosBitacora.xlsx';
  termino: String = "";
  dato: string = "";
  usuarios!: InterfazBitacora[];


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
    this.authService.getAllBitacora()
      .subscribe((bitacora) => {
        this.bitacoraDatos = bitacora;
        console.log(bitacora);
      }, (error) => {
        console.log(error);
      }
      )
  }

  
  // buscar() {
  //   this.hayError = false;
  //   this.termino = this.dato;
  //   this.authService.buscarUsuario(this.dato)
  //     .subscribe((usuarios) => {
  //       this.usuariosDatos = usuarios;
  //     }, (err) => {
  //       this.hayError = true;
  //       this.usuarios = [];
  //     })
  // }


  imprimirLista() {
    let pdf = new jsPDF('p', 'mm', [1000, 1000]);
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('Tabla de bitacora');
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

}
