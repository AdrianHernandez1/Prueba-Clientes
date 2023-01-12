import { Component, Input, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import * as mapboxgl from 'mapbox-gl';
import { InterfazEstados } from '../../interfaces/estados.interfaces';
import { InterfazMunicipios } from '../../interfaces/municipio.interfaces';

@Component({
  selector: 'app-detalle-c-guardar',
  templateUrl: './detalle-c-guardar.component.html',
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
export class DetalleCGuardarComponent implements AfterViewInit, OnInit{
  @Input() lngLat: [number, number] = [-101.68337786078459,21.1213454578527];;
  @ViewChild('mapa') divMapa!: ElementRef;
  datoEstado:number=0;


  ngOnInit():void {
    this.getAllEstados();
    
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
  
  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

miFormulario: FormGroup = this.fb.group({
  full_name:     [, [ Validators.required ,Validators.minLength(1), Validators.maxLength(70) ]],
  phone: [, [ Validators.required,Validators.minLength(1), Validators.maxLength(10) ]],
  email:    [, [ Validators.required,Validators.minLength(1), Validators.email, Validators.maxLength(70)]],
  housing: [, [ Validators.required,Validators.minLength(1), Validators.maxLength(50) ]],
  street:    [, [ Validators.required,Validators.minLength(1), Validators.maxLength(100)]],
  postal_code:     [, [ Validators.required,Validators.minLength(1), Validators.maxLength(5) ]],
  idMunicipality_Customer:    [, [ Validators.required,Validators.minLength(1), Validators.maxLength(5)]]
  });

  registro() {
      const { 
        full_name,
        phone,
        email,
        housing,
        street,
        postal_code,
        idMunicipality_Customer
      } = this.miFormulario.value;
  
      this.authService.registro( full_name,
        phone,
        email,
        housing,
        street,
        postal_code,
        idMunicipality_Customer )
        .subscribe( ok => {
          Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Se guardo el cliente con exito',
                      showConfirmButton: false,
                      timer: 1500
                    });
                    this.router.navigateByUrl('auth/catalogoCliente');
        },(error)=>{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Verifica que tus campos cumplan no esten vacios y cumplan con el ejemplo solicitado'
          })
        });
  
    }

    @Input() estados!: InterfazEstados[] ;
    tipoSeleccionado: number = 0;
    estadosDatos!:InterfazEstados;
    municipiosDatos!: InterfazMunicipios;
    
  
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
      alert(this.datoEstado)
    }
  

}
