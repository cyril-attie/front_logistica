import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';
import { Perfil } from '../interfaces/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  baseUrl: string = '';
  
  constructor(private httpClient: HttpClient) { 
    this.baseUrl = environment.apiUrl + '/api/perfil';
  }

  //Obtención de todos los pedidoes

  getPerfil() : Promise<Perfil | any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.get<Perfil>(`${this.baseUrl}`,httpOptions)) 
  }


  // Actualizar un nuevo pedido
  update(perfil: Perfil): Promise<Perfil | any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.put<Perfil>(`${this.baseUrl}/${perfil}`, perfil, httpOptions))
  }

  // Eliminar un pedido
  delete(id: number): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/${id}`, httpOptions))
  }

}
