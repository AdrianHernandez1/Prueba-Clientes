import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InterfazBitacora } from '../../interfaces/bitacora.interfaces';
import { AuthService } from '../../services/auth.service';
import jsPDF from 'jspdf';
import *as XLSX from 'xlsx';
import html2canvas from 'html2canvas';


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
        window.location.reload();
      }
      )
  }

  
  buscar() {
    this.hayError = false;
    this.termino = this.dato;
    this.authService.buscarBitacora(this.dato)
      .subscribe((usuarios) => {
        this.bitacoraDatos = usuarios;
      }, (err) => {
        this.hayError = true;
        this.usuarios = [];
      })
  }


  // imprimirLista() {
  //   const DATA: any = document.getElementById('datoTabla');
  //   const doc = new jsPDF('p', 'pt', 'a4');
  //   const options = {
  //     background: 'white',
  //     scale: 3
  //   };
  //   html2canvas(DATA, options).then((canvas) => {
 
  //     const img = canvas.toDataURL('image/PNG');
 
  //     const bufferX = 15;
  //     const bufferY = 15;
  //     const imgProps = (doc as any).getImageProperties(img);
  //     const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //     doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
  //     return doc;
  //   }).then((docResult) => {
  //     docResult.save(`Datos de bitacora.pdf`);
  //   });
  // }

  exportarExcel(): void {
    let element = document.getElementById('datoTabla');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.excel);
  }

}
