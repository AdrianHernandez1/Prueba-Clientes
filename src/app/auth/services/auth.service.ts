import { Injectable } from '@angular/core';
import { environmentConsumoApi } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { InterfazEstados, State } from '../interfaces/estados.interfaces';
import { InterfazCliente, Customer } from '../interfaces/interfaces';
import { InterfazMunicipios, Municipality } from '../interfaces/municipio.interfaces';
import { InterfazLogin } from '../interfaces/login.interface';
import { InterfazUsuario, User } from '../interfaces/usuarios.interface';
import { InterfazBitacora } from '../interfaces/bitacora.interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environmentConsumoApi.baseUrl;
  private token=localStorage.getItem("token");


  constructor(private http: HttpClient) { }

  //Listado de clientes
  getAll(): Observable<InterfazCliente> {
    const url = `${this.baseUrl}/api/clientes?token=${this.token}`;
    return this.http.get<InterfazCliente>(url);
  }

  //Guardar clientes
  registro(full_name: string,
    phone: string,
    email: string,
    housing: string,
    street: string,
    postal_code: number,
    idMunicipality_Customer: number): Observable<Customer> {

    const url = `${this.baseUrl}/api/clientes?token=${this.token}`;
    const body = {
      full_name,
      phone,
      housing,
      postal_code,
      email,
      street,
      idMunicipality_Customer
    };

    return this.http.post<Customer>(url, body);
  }

  getClientePorId(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/api/clientes/${id}?token=${this.token}`);
  }

  actualizarCliente(cliente: Customer): Observable<Customer> {
    const url = `${this.baseUrl}/api/clientes/${cliente.idCustomer}?token=${this.token}`;
    return this.http.put<Customer>(url, cliente);
  }

  //Eliminar cliente
  borrarCliente(cliente: Customer): Observable<Customer> {
    const url = `${this.baseUrl}/api/clientes/${cliente.idCustomer}?token=${this.token}`;
    return this.http.delete<Customer>(`${url}`);
  }

  //Listado de Estados
  getAllEstados(): Observable<InterfazEstados> {
    const url = `${this.baseUrl}/api/estados?token=${this.token}?token=${this.token}`;
    return this.http.get<InterfazEstados>(url);
  }


  //Lista de municipios 
  getAllMunicipios(): Observable<InterfazMunicipios> {
    const url = `${this.baseUrl}/api/municipios?token=${this.token}`;
    return this.http.get<InterfazMunicipios>(url);
  }

  //Buscar Cliente
  buscarCliente(termino: string): Observable<InterfazCliente> {
    const url = `${this.baseUrl}/api/clientes/search/full_name?query=${termino}&token=${this.token}`;
    return this.http.get<InterfazCliente>(url);
  }

  //Login
  login(user: string, password: string) {

    const url = `${this.baseUrl}/api/login/in`;
    const body = { user, password };

    return this.http.post<InterfazLogin>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }
  
  //Listado de usuario
  getAllUsuario(): Observable<InterfazUsuario> {
    const url = `${this.baseUrl}/api/usuarios?token=${this.token}`;
    return this.http.get<InterfazUsuario>(url);
  }
  //  //Buscar usuario
   buscarUsuario(termino: string): Observable<InterfazUsuario> {
    const url = `${this.baseUrl}/api/usuarios/search/name?query=${termino}&token=${this.token}`;
    return this.http.get<InterfazUsuario>(url);
  }

  //Guardar usuarios
  registroUsuario(
    name: string,
    password: string,
    email: string,
    idRole_User: number
  ): Observable<User> {

    const url = `${this.baseUrl}/api/usuarios?token=${this.token}`;
    const body = {
      name,
      password,
      email,
      idRole_User
    };

    return this.http.post<User>(url, body);
  }

  //Eliminar usuario
  borrarUsuario(usuario: User): Observable<User> {
    const url = `${this.baseUrl}/api/usuarios/${usuario.idUser}?token=${this.token}`;
    return this.http.delete<User>(`${url}`);
  }

  //Actualizar usuarios
  getUsuarioPorId(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/usuarios/${id}?token=${this.token}`);
  }

  actualizarUsuario(usuario: User): Observable<User> {
    const url = `${this.baseUrl}/api/clientes/${usuario.idUser}?token=${this.token}`;
    return this.http.put<User>(url, usuario);
  }

  logout() {
    localStorage.clear();
  }

  //Listado de usuario
  getAllBitacora(): Observable<InterfazBitacora> {
    const url = `${this.baseUrl}/api/registros?token=${this.token}`;
    return this.http.get<InterfazBitacora>(url);
  }
}
