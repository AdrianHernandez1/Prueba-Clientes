import { Component, AfterViewInit, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { AuthService } from '../../services/auth.service';
import { InterfazCliente, Cliente } from '../../interfaces/interfaces';
// import * as jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

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
  clientesDatos!:InterfazCliente;
   @Input() lngLat: [number, number]= [-101.60257306554463, 21.09640385894646];;
 
  @ViewChild('mapa') divMapa!: ElementRef;
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

  // buscarClienteCordenadas(cliente:Cliente){
  //   this.lngLat[ Number(cliente.longitud),Number(cliente.latitud)];
  //   alert(this.lngLat);
    
  // }

  constructor(
    private authService: AuthService,
    private router:Router,
  ) {

   }
  ngOnInit() {

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
      this.router.navigate(['/auth/catalogoCliente'])
    });
      Swal.fire(
        'Eliminado!',
        'El cliente se elimino con exito',
        'success'
      )
    }
  })  
}

imprimirLista(){
// var doc = new jsPDF('p', 'px', 'a4');

// var elementToPrint = document.getElementById('datosTabla');
// doc.html(elementToPrint, {
//         html2canvas: {
//             scale: 0.45
//         },
//         callback: function (doc) {
//             doc.save();
//         }
//     });

// }
}
}

  // ngOnInit(): void {
  //   this.activatedRoute.params
  //   .pipe(
  //     switchMap(()=>this.authService.getAll()), 
  //     tap(console.log)
      
  //   ).subscribe(data => this.clientes=data[0]);
  //     }
  //   }

