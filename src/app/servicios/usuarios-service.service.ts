import { Injectable, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {

  baseUrl: string = 'http://34.65.131.41:3000/api/usuarios';
  arrUsuarios: Usuario[] = [];

  constructor(private httpClient: HttpClient) { }

 

 getAll() : Promise<any> {
  return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`)) 
 }

} 

 