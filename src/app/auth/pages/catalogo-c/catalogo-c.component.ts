import { Component, AfterViewInit, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { AuthService } from '../../services/auth.service';
import { InterfazCliente, Cliente } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import *as XLSX from 'xlsx';

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
export class CatalogoCComponent implements AfterViewInit, OnInit {
  @Input() lngLat: [number, number]= [-101.68337786078459,21.1213454578527];
  @ViewChild('mapa') divMapa!: ElementRef;
  @ViewChild('datoTabla',{static:false})el!:ElementRef ;
  clientesDatos!:InterfazCliente;
  hayError:boolean=false;
  excel='DatosClientes.xlsx';
  termino:String="";
  dato:string="";
  clientes!:Cliente[];
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
    private router:Router,
  ) {

   }
  ngOnInit() {
    this.getAllClientes();
    this.buscar();
}

getAllClientes(){
  this.authService.getAll()
  .subscribe((clientes)=>{      
   this.clientesDatos=clientes;
   console.log(clientes);
   },(error)=>{
     console.log(error);
   }
   )
}

borrarCliente(cliente:Cliente){
  Swal.fire({
    title: '¿Estas seguro de eliminar este cliente?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
    if (result.isConfirmed) {
      this.authService.borrarCliente(cliente )
    .subscribe( resp => {
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

buscar(){
  this.hayError=false;
  this.termino=this.dato;
  this.authService.buscarCliente(this.dato)
  .subscribe((clientes)=>{
    this.clientes=clientes;
  },(err)=>{
    this.hayError=true;
    this.clientes=[];
  })

}


imprimirLista(){
  let pdf=new jsPDF('p', 'mm', [720, 1000]);
  pdf.html(this.el.nativeElement,{
    callback:(pdf)=>{
      pdf.save('Tabla de clientes');
    }
  });
}

exportarExcel():void{
  let element=document.getElementById('datoTabla');
  const ws:XLSX.WorkSheet=XLSX.utils.table_to_sheet(element);
  const wb:XLSX.WorkBook=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
  XLSX.writeFile(wb,this.excel);
}

Buscar(){
  Swal.fire({
    icon: 'info',
    title: 'Esta función no se encuentra activa',
    showConfirmButton: false,
    timer: 1500
  });
}

}


