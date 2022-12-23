import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import * as mapboxgl from 'mapbox-gl';

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
export class DetalleCGuardarComponent {
  @Input() lngLat: [number, number] = [-101.60257306554463, 21.09640385894646];
  @ViewChild('mapa') divMapa!: ElementRef;

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
    private activatedRoute: ActivatedRoute,) { }

miFormulario: FormGroup = this.fb.group({
    nombre:     [, [ Validators.required ]],
    apellidoP:    [, [ Validators.required]],
    apellidoM: [, [ Validators.required ]],
    rfc:     [, [ Validators.required ]],
    nombreFiscal:    [, [ Validators.required]],
    telefono: [, [ Validators.required ]],
    puesto:     [, [ Validators.required ]],
    sucursal:    [, [ Validators.required]],
    colonia: [, [ Validators.required ]],
    codigoPostal:     [, [ Validators.required ]],
    email:    [, [ Validators.required]],
    fkEstado: [, [ Validators.required ]],
    fkMunicipio:     [, [ Validators.required ]],
    referencia:    [, [ Validators.required]],
    latitud: [, [ Validators.required ]],
    longitud:     [, [ Validators.required ]]
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
        });
  
    }
    
  

}
