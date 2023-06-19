import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Stock } from '../interfaces/stock';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  baseUrl: string = '';
  
  constructor(private httpClient: HttpClient) { 
    this.baseUrl = environment.apiUrl + '/api/stocks';
  }

  //Obtención de todo el stock
  getAll() : Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`, httpOptions)) 
  }
  //Obtener mediante el ID
  getById(id: number) : Promise<Stock> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.get<Stock>(`${this.baseUrl}/${id}`, httpOptions))
  }

  // Actualizar stock
  update(stock: any,id : number): Promise<Stock | any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.put<Stock>(`${this.baseUrl}/${id}`, stock, httpOptions))
  }

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
  
    const url = `${this.baseUrl}?almacen=${almacen}`;
    return lastValueFrom(this.httpClient.get<any>(url, httpOptions));
  }
}