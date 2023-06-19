import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rol } from '../interfaces/rol';
import { NotificacionesService } from './notificaciones.service';

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

  notificacionesService = inject(NotificacionesService);

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


 //Obtener roles y permisos
 async getRolesPermisos(pId: number,metodo: string, rutaAPI: string): Promise<boolean> {

  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token_almacen')!
    })
  };

  try {
    //Buscamos en la tabla roles_have_permisos por el id de rol
    const response = await lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${pId}`, httpOptions));
    if (response.fatal) {
      this.notificacionesService.showError("Al recuperar los permisos algo ha ido mal");
      return false;
    }
    const rolesPermisos = response[0];
    //Si nada va mal, este nos va a devolver un objeto con la propiedad permisos, y dentro de 
    //esta, un array con todos los permisos que tiene el rol, filtraremos por la ruta del API y el metodo que sera GET,POST,PUT,DELETE
    for (const permiso of rolesPermisos.permisos) {
      if (permiso.ruta && permiso.ruta.includes(`api/${rutaAPI}%`) && permiso.metodo === metodo) {
        return true; //Si encontramos devolvemos true
      }
    }
    return false; //Si no encontramos devolvemos false
  } catch (err) {
    this.notificacionesService.showError("Al recuperar los permisos algo ha ido mal");
    console.log(err);
    return false;
  }
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
