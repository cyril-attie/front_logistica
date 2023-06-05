import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Pedido } from '../interfaces/pedido';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  baseUrl: string = 'http://34.65.131.41:3000/api/pedidos';
  arrPedidos: Pedido[] = [];
  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`))
  }
}
