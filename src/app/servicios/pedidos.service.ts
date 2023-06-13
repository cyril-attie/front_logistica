import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Pedido } from '../interfaces/pedido';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  baseUrl: string = '';
  
  constructor(private httpClient: HttpClient) { 
    this.baseUrl = environment.apiUrl + '/api/pedidos';
  }

  //Obtención de todos los pedidoes

  getAll() : Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`,httpOptions)) 
  }
  //Obtener mediante el ID
  getById(id: number) : Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.get<Pedido>(`${this.baseUrl}/${id}`))
  }

  // Crear un nuevo usuario
  create(pedido: Pedido): Promise <Pedido>{
    return lastValueFrom(this.httpClient.post<Pedido>(this.baseUrl, pedido))
  }

  // Actualizar un nuevo pedido
  update(pedido: Pedido): Promise<Pedido>{
    return lastValueFrom(this.httpClient.put<Pedido>(`${this.baseUrl}/${pedido.pedidos_id}`, pedido))
  }

  // Eliminar un pedido
  delete(id: number): Promise<any>{
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/${id}`))
   
  }
}
