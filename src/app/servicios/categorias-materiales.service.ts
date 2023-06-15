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
  getById(id: number) : Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.get<Categoria>(`${this.baseUrl}/${id}`, httpOptions))
  }

  // Crear un nuevo camión
  create(categoria: Categoria): Promise <Categoria>{
    return lastValueFrom(this.httpClient.post<Categoria>(this.baseUrl, categoria))
  }

  // Actualizar un nuevo camión
  update(categoria: Categoria): Promise<Categoria>{
    return lastValueFrom(this.httpClient.put<Categoria>(`${this.baseUrl}${categoria.categorias_materiales_id}`, categoria))
  }

  // Eliminar un camión
  delete(pId: number): Promise<any>{
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${pId}`))
   
  }
}
