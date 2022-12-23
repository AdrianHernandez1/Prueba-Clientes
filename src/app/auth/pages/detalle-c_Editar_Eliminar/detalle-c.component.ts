import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { InterfazEstados, Estado } from '../../interfaces/estados.interfaces';
import { Cliente } from '../../interfaces/interfaces';
import { switchMap } from 'rxjs';
import { InterfazMunicipios } from '../../interfaces/municipio.interfaces';

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
  @Input() lngLat: [number, number] = [-101.68337786078459,21.1213454578527];;
  @ViewChild('mapa') divMapa!: ElementRef;
  @Input() estados!: InterfazEstados[] ;
  tipoSeleccionado: number = 0;
  clientes!:Cliente;
  estadosDatos!:InterfazEstados;
  municipiosDatos!: InterfazMunicipios;
  
  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,) { }
    ngOnInit():void {
      this.getAllEstados();
      if(!this.router.url.includes('editarCliente')){
        return;
      }
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.authService.getClientePorId(id))
        )
        .subscribe(cliente => this.clientes = cliente);
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

  
  registro() {

    if (this.clientes.id=== 0) {
      return;
    }
    if (this.clientes.id) {
      //Actualizar 
      this.authService.actualizarCliente(this.clientes)
        .subscribe(cliente => {
          this.router.navigate(["/auth/catalogoCliente"]);
          Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Se actualizo el cliente con exito',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      
        },(error)=>{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Verifica que tus campos cumplan no esten vacios y cumplan con el ejemplo solicitado'
          })
        });
    } 
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

}