import { Injectable, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, lastValueFrom } from 'rxjs';
import { Login } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {

  private baseUrl: string;
  private _isLogged: BehaviorSubject<boolean>;
  private _rol: BehaviorSubject<Number>;

  arrUsuarios: Usuario[] = [];

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://34.65.131.41:3000/api/usuarios';
    this._isLogged = new BehaviorSubject(
                      localStorage.getItem('token_almacen') ? true : false);
    let rol_almacen : Number | any = 0;
    
    if (localStorage.getItem('rol_almacen')) {
      const getRole : any = localStorage.getItem('rol_almacen');
      rol_almacen = parseInt(getRole);
    }
    this._rol = new BehaviorSubject(rol_almacen);
  }

  //Métodos para obtener y cambiar las propiedades "" obserbale que para la gente que se suscribe a este - APSP
  get isLogged() {
    return this._isLogged.asObservable();
  }
  changeLogin (actualizarLogin: boolean) : void {
    this._isLogged.next(actualizarLogin);
  }
  get rol() {
    return this._rol.asObservable();
  }
  changeRol (actualizarRol: Number) : void {
    this._rol.next(actualizarRol);
  }

  //Método para el login - APSP
  login(values: Login | any) : Promise<any> {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, values)
    )
  }

  //Obtención de todos los usuarios
  getAll() : Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`)) 
  }
  //Obtener mediante el ID
  getById(pId: number) : Promise<any> {
    return lastValueFrom(this.httpClient.get<Usuario>(`${this.baseUrl}${pId}`))
  }

  // Crear un nuevo usuario
  create(pUser: Usuario): Promise <Usuario>{
    return lastValueFrom(this.httpClient.post<Usuario>(this.baseUrl, pUser))
  }

  // Actualizar un nuevo usuario
  update(pUser: Usuario): Promise<Usuario>{
    return lastValueFrom(this.httpClient.put<Usuario>(`${this.baseUrl}${pUser.id}`, pUser))
  }

  // Eliminar un usuario
  delete(pId: string): Promise<any>{
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${pId}`))
   
  }

} 

 