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
  arrUsuarios: Usuario[] = [];

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://34.65.131.41:3000/api/usuarios';
    this._isLogged = new BehaviorSubject(
                      localStorage.getItem('token_almacen') ? true : false)
  }

  //Métodod para obtener y cambiar la la propiedad obserbale que para la gente que se suscribe a este - APSP
  get isLogged() {
    return this._isLogged.asObservable();
  }
  changeLogin (actualizarLogin: boolean) : void {
    this._isLogged.next(actualizarLogin);
  }

  //Método para el login - APSP
  login(values: Login | any) : Promise<any> {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/login`, values)
    )
  }

  //Obtención de todos los usuarios
  getAll() : Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`)) 
  }

} 

 