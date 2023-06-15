import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Material } from '../interfaces/material';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  baseUrl: string = '';

  constructor(private httpClient: HttpClient) { 

    this.baseUrl = environment.apiUrl + '/api/materiales';
  }




  getAll() : Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_almacen')!
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`, httpOptions)) 
  }

  
  getById(id: number) : Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_almacen')!
      })
    } 
    return lastValueFrom(this.httpClient.get<Material>(`${this.baseUrl}/${id}`, httpOptions))
  }

 
  create(material: Material): Promise <Material>{
    return lastValueFrom(this.httpClient.post<Material>(this.baseUrl, material))
  }


  update(material: Material): Promise<Material>{
    return lastValueFrom(this.httpClient.put<Material>(`${this.baseUrl}${material.materiales_id}`, material ))
  }

  
  delete(id: number): Promise<any>{
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${id}`))
   
  }
}
