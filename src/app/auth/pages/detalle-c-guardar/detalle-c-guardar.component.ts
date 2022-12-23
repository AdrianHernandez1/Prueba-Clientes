import { Component, Input, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import * as mapboxgl from 'mapbox-gl';
import { InterfazEstados } from '../../interfaces/estados.interfaces';
import { Cliente } from '../../interfaces/interfaces';
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
    nombre:     [, [ Validators.required ,Validators.minLength(1), Validators.maxLength(50) ]],
    apellidoP:    [, [ Validators.required,Validators.minLength(1), Validators.maxLength(50)]],
    apellidoM: [' ', [Validators.maxLength(50)]],
    rfc:     [, [ Validators.required ,Validators.minLength(1), Validators.maxLength(13) ]],
    nombreFiscal:    [, [ Validators.required,Validators.minLength(1), Validators.maxLength(50)]],
    telefono: [, [ Validators.required,Validators.minLength(1), Validators.maxLength(10) ]],
    puesto:     [, [ Validators.required,Validators.minLength(1), Validators.maxLength(50) ]],
    sucursal:    [, [ Validators.required,Validators.minLength(1), Validators.maxLength(50)]],
    colonia: [, [ Validators.required,Validators.minLength(1), Validators.maxLength(50) ]],
    codigoPostal:     [, [ Validators.required,Validators.minLength(1), Validators.maxLength(5) ]],
    email:    [, [ Validators.required,Validators.minLength(1), Validators.email, Validators.maxLength(60)]],
    fkEstado: [, [ Validators.required , Validators.maxLength(5)]],
    fkMunicipio:     [, [ Validators.required ,Validators.minLength(1), Validators.maxLength(5)]],
    referencia:    [, [ Validators.required,Validators.minLength(1), Validators.maxLength(100)]],
    latitud: [, [ Validators.required,Validators.minLength(1), Validators.maxLength(20) ]],
    longitud:     [, [ Validators.required,Validators.minLength(1), Validators.maxLength(20)  ]]
  });

  registro() {
      const { nombre,
        apellidoP,
        apellidoM,
        telefono,
        puesto,
        sucursal,
        rfc,
        nombreFiscal,
        latitud,
        longitud,
        fkEstado,
        fkMunicipio,
        codigoPostal,
        colonia,
        referencia} = this.miFormulario.value;
  
      this.authService.registro( nombre,
        apellidoP,
        apellidoM,
        telefono,
        puesto,
        sucursal,
        rfc,
        nombreFiscal,
        latitud,
        longitud,
        fkEstado,
        fkMunicipio,
        codigoPostal,
        colonia,
        referencia )
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
    clientes!:Cliente;
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
    }
  

}
