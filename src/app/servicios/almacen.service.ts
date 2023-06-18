import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Almacen } from '../interfaces/almacen';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {
  baseUrl : string = "";

  constructor(private httpClient : HttpClient) { 
    this.baseUrl = environment.apiUrl + "/api/almacenes";
  }

  //Obtención de todos los almacenes
  getAll() : Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`,httpOptions)) 
  }


  //Obtener mediante el ID
  getById(id: number) : Promise<Almacen> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.get<Almacen>(`${this.baseUrl}/${id}`, httpOptions))
  }


  
  // Crear un nuevo usuario
  create(almacen: Almacen): Promise <Almacen | any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.post<Almacen>(`${this.baseUrl}/nuevo`, almacen, httpOptions))
  }

  // Actualizar un nuevo almacen
  update(almacen: Almacen, id: number): Promise<Almacen | any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.put<Almacen>(`${this.baseUrl}/${id}`, almacen, httpOptions))
  }

  // Eliminar un almacen
  delete(id: number): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/${id}`, httpOptions))
   
  }

  //prueba de coger el stock por almacen 
  obtenerStocksPorAlmacen(almacen: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_almacen')!
      })
    };
  
    const url = `http://localhost:3000/api/stock?almacen=${almacen}`;
    return lastValueFrom(this.httpClient.get<any>(url, httpOptions));
  }


}
