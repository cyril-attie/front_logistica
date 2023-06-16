import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camion } from '../interfaces/camion';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CamionesService {
  
  baseUrl: string = '';

  constructor(private httpClient: HttpClient) { 

     // De momento estoy usando esta URL cómo prueba de usuarios - NO EXISTE AUN ESTA URL
     this.baseUrl = environment.apiUrl + '/api/camiones';
  }


  //Obtención de todos los camiones
  getAll() : Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`,httpOptions)) 
  }

  //Obtener mediante el ID
  getById(pId: number) : Promise<any> {
    return lastValueFrom(this.httpClient.get<Camion>(`${this.baseUrl}/${pId}`))
  }

  // Crear un nuevo camión
  create(camion: Camion): Promise <Camion>{
    return lastValueFrom(this.httpClient.post<Camion>(`${this.baseUrl}/nuevo`, camion))
  }

  // Actualizar un nuevo camión
  update(camion: Camion): Promise<Camion>{
    return lastValueFrom(this.httpClient.put<Camion>(`${this.baseUrl}${camion.id}`, camion))
  }

  // Eliminar un camión
  delete(pId: number): Promise<any>{
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${pId}`))
   
  }
}
