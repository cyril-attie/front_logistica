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

     // URL
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
  getById(pId: number) : Promise<Camion> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.get<Camion>(`${this.baseUrl}/${pId}`, httpOptions))
  }

  // Crear un nuevo camión
  create(camion: Camion): Promise <Camion>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.post<Camion>(`${this.baseUrl}/nuevo`, camion, httpOptions))
  }

  // Actualizar un nuevo camión
  update(camion: Camion, id : number): Promise<Camion | any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.put<Camion>(`${this.baseUrl}/${id}`, camion, httpOptions))
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
