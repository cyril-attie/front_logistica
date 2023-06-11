import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Material } from '../interfaces/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  baseUrl: string = '';

  constructor(private httpClient: HttpClient) { 

     // this.baseUrl = ''; --> INICIALIZAR CON URL
  }


  
  getAll() : Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`)) 
  }
  
  getById(id: number) : Promise<any> {
    return lastValueFrom(this.httpClient.get<Material>(`${this.baseUrl}${id}`))
  }

 
  create(material: Material): Promise <Material>{
    return lastValueFrom(this.httpClient.post<Material>(this.baseUrl, material))
  }


  update(material: Material): Promise<Material>{
    return lastValueFrom(this.httpClient.put<Material>(`${this.baseUrl}${material.id}`, material ))
  }

  
  delete(id: number): Promise<any>{
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${id}`))
   
  }
}
