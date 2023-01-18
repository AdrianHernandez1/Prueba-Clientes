import { Component, AfterViewInit, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { AuthService } from '../../services/auth.service';
import { InterfazCliente, Customer } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import *as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import { Coordenadas } from '../../interfaces/coordenadas.interface';


@Component({
  selector: 'app-catalogo-c',
  templateUrl: './catalogo-c.component.html',
  styles: [
    `
    .inputBuscar {
      border-radius: 10px;
      width: 500px;
   }
   .mapa {
     width: 90%;
     height: 500px;
     margin: 0px;
   }
   
    `
  ]
})
export class CatalogoCComponent implements AfterViewInit, OnInit{
  latitud:number=Number(sessionStorage.getItem('latitud'));
  longitud:number=Number(sessionStorage.getItem('longitud'));
  @Input() lngLat: [number, number] = [this.longitud,this.latitud];
  @ViewChild('mapa') divMapa!: ElementRef;
  @ViewChild('datoTabla', { static: false }) el!: ElementRef;
  clientesDatos!: InterfazCliente;
  coordenas!:Coordenadas;
  hayError: boolean = false;
  excel = 'DatosClientes.xlsx';
  termino: String = "";
  dato: string = "";
  clientes!: InterfazCliente[];

  ngAfterViewInit(): void {
    const mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 15
    }
    );
    new mapboxgl.Marker()
      .setLngLat(this.lngLat)
      .addTo(mapa);
  }

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {

  }
  usuario: any;
  nombre = sessionStorage.getItem("usuario");

  ngOnInit() {
    this.getAllClientes();
    this.buscar();
  }

  getAllClientes() {
    this.authService.getAll()
      .subscribe((customers) => {
        this.clientesDatos = customers;
      }, (error) => {
        console.log(error);
        window.location.reload();
      }
      )

  }

  borrarCliente(cliente: Customer) {
    Swal.fire({
      title: '¿Estas seguro de eliminar este cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.borrarCliente(cliente)
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
    this.authService.buscarCliente(this.dato)
      .subscribe((clientes) => {
        this.clientesDatos = clientes;
      }, (err) => {
        this.hayError = true;
        this.clientes = [];
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
      docResult.save(`Datos de Cliente.pdf`);
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

getAllCoordenadas(cliente:Customer){
  this.authService.getAllCoordenadas(cliente)
  .subscribe((coordenadas) => {
    this.coordenas = coordenadas;
    window.location.reload();
  }, (error) => {
    console.log(error);
    }
  )
}

getAllCoordenadasCatalogo(cliente:Customer){
  this.authService.getAllCoordenadas(cliente)
  .subscribe((coordenadas) => {
    this.coordenas = coordenadas;
    window.location.reload();
  }, (error) => {
    console.log(error);
    }
  )
}
}


