import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasMaterialesService {

  baseUrl: string = '';

  constructor(private httpClient: HttpClient) { 
     this.baseUrl = environment.apiUrl + '/api/categorias';
  }

  getAll() : Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`, httpOptions)) 
  }

  //Obtener mediante el ID
  getById(id: number) : Promise<Categoria> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.get<Categoria>(`${this.baseUrl}/${id}`, httpOptions))
  }

  // Crear un nuevo camión
  create(categoria: Categoria): Promise <Categoria>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.post<Categoria>(`${this.baseUrl}/nuevo`, categoria, httpOptions))
  }

  // Actualizar un nuevo camión
  update(categoria: Categoria, id : number): Promise<Categoria | any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.put<Categoria>(`${this.baseUrl}/${id}`, categoria, httpOptions))
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
