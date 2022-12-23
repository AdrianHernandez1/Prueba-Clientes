import { Injectable } from '@angular/core';
import {  environmentConsumoApi } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { InterfazEstados, Estado } from '../interfaces/estados.interfaces';
import { InterfazCliente, Cliente } from '../interfaces/interfaces';
import { InterfazMunicipios, Municipio } from '../interfaces/municipio.interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environmentConsumoApi.baseUrl;
  //  baseUrl2= 'https://practicaits2022-production.up.railway.app/api/clientes'

  constructor(private http: HttpClient) { }

  // getAll(){
  //   return this.http.get<InterfazClientes[]>(this.baseUrl2);
  // }

  //Listado de clientes
  getAll(): Observable<InterfazCliente>{
    const url=`${ this.baseUrl }/api/clientes`;
    return this.http.get<InterfazCliente>(url);
  }
 

  //Guardar clientes
  // registro(cliente:Clientes):Observable<Clientes>{
  //   const url  = `${ this.baseUrl }/api/clientes`;
  //   return this.http.post<Clientes>( url, cliente );
  // }
  registro(cliente:Cliente):Observable<Cliente>{
    const url=`${ this.baseUrl }/api/clientes`;
    return this.http.post<Cliente>(url,cliente);
  }

  // registro( nombre:       string,
  //     apellidoP:    string,
  //     apellidoM:    string,
  //     telefono:     string,
  //     puesto:       string,
  //     sucursal:     string,
  //     rfc:          string,
  //     nombreFiscal: string,
  //     latitud:      string,
  //     longitud:     string,
  //     fkEstado:     number,
  //     fkMunicipio:  number,
  //     codigoPostal: string,
  //     colonia:      string,
  //     referencia:   string):Observable<Cliente>{
    
  //   const url  = `${ this.baseUrl }/api/clientes`;
  //   const body = { nombre,
  //           apellidoP,
  //           apellidoM,
  //           telefono,
  //           puesto,
  //           sucursal,
  //           rfc,
  //           nombreFiscal,
  //           latitud,
  //           longitud,
  //           fkEstado,
  //           fkMunicipio,
  //           codigoPostal,
  //           colonia,
  //           referencia };
    
  //   return this.http.post<Cliente>( url, body );
  //   }
  getClientePorId(id:string):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.baseUrl}/api/clientes/${id}`);
  }

  actualizarCliente(cliente:Cliente):Observable<Cliente>{
    const url=`${ this.baseUrl }/api/clientes/${cliente.id}`;
    return this.http.put<Cliente>(url,cliente);
  }
  
  //Eliminar cliente
  borrarCliente(cliente:Cliente):Observable<Cliente>{
    const url=`${ this.baseUrl }/api/clientes/${cliente.id}`
    return this.http.delete<Cliente>(`${url}`);
  }

  

  //Listado de Estados
  getAllEstados():Observable<InterfazEstados>{
    const url=`${ this.baseUrl }/api/estados`
    return this.http.get<InterfazEstados>(url);
  }


  //Lista de municipios 
  getAllMunicipios():Observable<InterfazMunicipios>{
    const url=`${ this.baseUrl }/api/municipios`
    return this.http.get<InterfazMunicipios>(url);
  }
  
  // getAllMunicipios(id:any):Observable<InterfazMunicipios>{
  //   const url=`${ this.baseUrl }/api/municipios/byEstado/${id}`
  //   return this.http.get<InterfazMunicipios>(url);
  // }
  //Buscar Cliente
  buscarCliente(termino:string):Observable<Cliente[]>{
    const url=`${ this.baseUrl }/api/clientes/search/nombre?query=${termino}`;
    return this.http.get<Cliente[]>(url);
}
}

// registro( nombre:       string,
//   apellidoP:    string,
//   apellidoM:    string,
//   telefono:     string,
//   puesto:       string,
//   sucursal:     string,
//   rfc:          string,
//   nombreFiscal: string,
//   latitud:      string,
//   longitud:     string,
//   fkEstado:     number,
//   fkMunicipio:  number,
//   codigoPostal: string,
//   colonia:      string,
//   referencia:   string):Observable<Cliente>{

// const url  = `${ this.baseUrl }/api/clientes`;
// const body = { nombre,
//         apellidoP,
//         apellidoM,
//         telefono,
//         puesto,
//         sucursal,
//         rfc,
//         nombreFiscal,
//         latitud,
//         longitud,
//         fkEstado,
//         fkMunicipio,
//         codigoPostal,
//         colonia,
//         referencia };

// return this.http.post<Cliente>( url, body );
// }