import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camion } from '../interfaces/camion';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamionesService {
  
  baseUrl: string = '';

  constructor(private httpClient: HttpClient) { 

     // De momento estoy usando esta URL cómo prueba de usuarios - NO EXISTE AUN ESTA URL
     this.baseUrl = 'http://34.65.131.41:3000/api/camiones';
  }


  //Obtención de todos los camiones
  getAll() : Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`)) 
  }
  //Obtener mediante el ID
  getById(pId: number) : Promise<any> {
    return lastValueFrom(this.httpClient.get<Camion>(`${this.baseUrl}${pId}`))
  }

  // Crear un nuevo camión
  create(camion: Camion): Promise <Camion>{
    return lastValueFrom(this.httpClient.post<Camion>(this.baseUrl, camion))
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
