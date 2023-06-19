import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rol } from '../interfaces/rol';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  baseUrl: string;
  private _rolJefeDeEquipo : Number = 2; 
  private _rolEncargado : Number = 3;   
  private _rolOperario : Number = 4;   
  
  static rolJefeDeEquipoStatic = 2;
  static rolEncargadoStatic = 3;
  static rolOperarioStatic = 4;



  constructor(private httpClient: HttpClient) { 

    // De momento estoy usando esta URL cómo prueba de usuarios - NO EXISTE AUN ESTA URL
    this.baseUrl = environment.apiUrl + '/api/roles';
 }

 //obtener roles
 get rolJefeDeEquipo() {
  return this._rolJefeDeEquipo;
 }
 get rolEncargado() {
  return this._rolEncargado;
 }
 get rolOperario() {
  return this._rolOperario;
 }

 //Obtención de todos los Roles
 getAll() : Promise<any> {
   const httpOptions = {
     headers: new HttpHeaders({
       'Authorization': localStorage.getItem('token_almacen')!
     })
   }
   return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`,httpOptions)) 
 }

 //Obtener mediante el ID
 getById(pId: number) : Promise<Rol> {
   const httpOptions = {
     headers: new HttpHeaders({
       'Authorization': localStorage.getItem('token_almacen')!
     })
   }
   return lastValueFrom(this.httpClient.get<Rol>(`${this.baseUrl}/${pId}`, httpOptions))
 }

 //Obtener roles y permisos
 getRolesPermisos(pId: number) : Promise<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token_almacen')!
    })
  }
  return lastValueFrom(this.httpClient.get<Rol>(`${this.baseUrl}/${pId}`, httpOptions))
}

 // Crear un nuevo camión
 create(rol: Rol): Promise <Rol>{
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json', 
       'Authorization': localStorage.getItem('token_almacen')!
     })
   }
   return lastValueFrom(this.httpClient.post<Rol>(`${this.baseUrl}/nuevo`, rol, httpOptions))
 }

 // Actualizar un nuevo camión
 update(rol: Rol, id : number): Promise<Rol | any>{
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json', 
       'Authorization': localStorage.getItem('token_almacen')!
     })
   }
   return lastValueFrom(this.httpClient.put<Rol>(`${this.baseUrl}/${id}`, rol, httpOptions))
 }

 // Eliminar un camión
 delete(id: number): Promise<any>{
   const httpOptions = {
     headers: new HttpHeaders({
       'Authorization': localStorage.getItem('token_almacen')!
     })
   }
   return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/${id}`, httpOptions))
  
 }
}
