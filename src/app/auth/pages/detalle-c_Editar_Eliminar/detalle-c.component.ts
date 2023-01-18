import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { InterfazEstados } from '../../interfaces/estados.interfaces';
import { Customer, InterfazCliente } from '../../interfaces/interfaces';
import { switchMap } from 'rxjs';
import { InterfazMunicipios } from '../../interfaces/municipio.interfaces';
import { Coordenadas } from '../../interfaces/coordenadas.interface';

@Component({
  selector: 'app-detalle-c, ',
  templateUrl: './detalle-c.component.html',
  styles: [
    `
    .mapa {
      width: 100%;
      height: 400px;
      margin: 0px;
    }
    `
  ]
})
export class DetalleCComponent implements AfterViewInit, OnInit  {
  latitud:number=Number(sessionStorage.getItem('latitud'));
  longitud:number=Number(sessionStorage.getItem('longitud'));
  @Input() lngLat: [number, number] = [this.longitud,this.latitud];
  @ViewChild('mapa') divMapa!: ElementRef;
  @Input() estados!: InterfazEstados[] ;
  tipoSeleccionado: number = 0;
  customer!:Customer;
  estadosDatos!:InterfazEstados;
  municipiosDatos!: InterfazMunicipios;
  coordenas!:Coordenadas;

  
  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit():void {
      this.getAllEstados();
      if(!this.router.url.includes('editarCliente')){
        return;
      }
      this.activatedRoute.params
        .pipe(
          switchMap(({ idCustomer }) => this.authService.getClientePorId(idCustomer))
        )
        .subscribe(customer=> this.customer = customer);
    }   



    registro() {
      if (this.customer.idCustomer=== 0) {
        return;
      }
      if (this.customer.idCustomer) {
        //Actualizar 
        this.authService.actualizarCliente(this.customer)
          .subscribe(cliente => {
            this.router.navigate(["../catalogoCliente"]);
            Swal.fire({
                          icon: 'success',
                          title: 'Se actualizo el cliente con exito',
                          showConfirmButton: false,
                          timer: 1500
                        })
          },(error)=>{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error
            })
          });
      } 
    }


  ngAfterViewInit(): void {
    const mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 15
    });

    new mapboxgl.Marker()
      .setLngLat(this.lngLat)
      .addTo(mapa);
  }

  
  

  getAllEstados(){
this.authService.getAllEstados()
    .subscribe(estado=>{
 this.estadosDatos=estado;
    }
    )
    this.getAllMunicipio();
  }

  getAllMunicipio(){
    this.authService.getAllMunicipios()
    .subscribe(municipio=>{
      this.municipiosDatos=municipio;
    })
  }

  Buscar(){
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
    }, (error) => {
      console.log(error);
      }
    )
  }


}