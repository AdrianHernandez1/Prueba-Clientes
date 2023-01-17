import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../interfaces/login.interface';
import { AuthService } from '../../services/auth.service';
import jsPDF from 'jspdf';
import *as XLSX from 'xlsx';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-bitacora-login',
  templateUrl: './bitacora-login.component.html',
  styles: [
    `
    .inputBuscar {
      border-radius: 10px;
      width: 500px;
   }
    `
  ]
})
export class BitacoraLoginComponent {
  @ViewChild('datoTabla', { static: false }) el!: ElementRef;
  loginDatos!: Login;
  hayError: boolean = false;
  excel = 'DatosInicioSesión.xlsx';
  termino: String = "";
  dato: string = "";
  login!: Login[];


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
    this.authService.getAllLogin()
      .subscribe((datos) => {
        this.loginDatos = datos;
        console.log(datos);
      }, (error) => {
        console.log(error);
        window.location.reload();
      }
      )
  }

  
  buscar() {
    this.hayError = false;
    this.termino = this.dato;
    this.authService.buscarBitacora(this.dato)
      .subscribe((datos) => {
        this.loginDatos = datos;
      }, (err) => {
        this.hayError = true;
        this.login = [];
      })
  }


  imprimirLista() {
    const DATA: any = document.getElementById('datoTabla');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {
 
      const img = canvas.toDataURL('image/PNG');
 
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`Datos de inicio de sesión.pdf`);
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
