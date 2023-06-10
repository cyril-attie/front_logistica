import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Stock } from '../interfaces/stock';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  baseUrl: string = '';
  
  constructor(private httpClient: HttpClient) { 
    this.baseUrl = environment.apiUrl + '/api/stock';
  }

  //Obtención de todo el stock
  getAll() : Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`)) 
  }
  //Obtener mediante el ID
  getById(id: number) : Promise<any> {
    return lastValueFrom(this.httpClient.get<Stock>(`${this.baseUrl}/${id}`))
  }

  // Actualizar stock
  update(stock: Stock): Promise<Stock>{
    return lastValueFrom(this.httpClient.put<Stock>(`${this.baseUrl}/${stock.n_material}`, stock))
  }
}