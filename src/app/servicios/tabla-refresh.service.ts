import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//APSP - Componente para refrescar las tablas, cuando se elimine un registr
//edite o cree. Se disparara este metodo refreshTable del servicio
export class TablaRefreshService {

  private _refreshTablaSubject : BehaviorSubject<boolean>;

  constructor() {
    this._refreshTablaSubject = new BehaviorSubject<boolean>(false);
  }

  get refreshTablaSubject() {
    return this._refreshTablaSubject.asObservable();
  }
  refreshTabla() {
    this._refreshTablaSubject.next(true);
  }
  

}
