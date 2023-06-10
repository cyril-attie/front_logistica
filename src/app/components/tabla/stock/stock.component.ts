import { Component, OnInit, inject } from '@angular/core';
import { PropiedadesTabla } from 'src/app/interfaces/propiedades-tabla';
import { Stock } from 'src/app/interfaces/stock';
import { StockService } from 'src/app/servicios/stock.service'
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { TablaRefreshService } from 'src/app/servicios/tabla-refresh.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.sass']
})
export class StockComponent {

  //Definimos estas propiedades ya que les pasaremos al componente tabla en el
  //html
  propiedadesTabla: PropiedadesTabla = {
    response: [],
    columnas: [],
    claves: [],
    botones: {
      ver : false,
      editar : false,
      borrar: false,
    },
    url_param: ""
  };
  //Definimos este campo para actualizar la tabla en el componente hijo
  isUpdated : boolean = false;

  notificacionesService = inject(NotificacionesService)

  constructor(private stockService: StockService, 
              private tablaRefreshService: TablaRefreshService)
  {
    //Esta suscrito al obserbale refreshTablaSubject, cuando carga este componente detecta un cambio y lanza la acción pintarTabla()
    this.tablaRefreshService.refreshTablaSubject.subscribe(value => {
        this.pintarTabla()
    });
  }

  async pintarTabla() :Promise<void> {
    try{
      let response = await this.stockService.getAll();
      //Almacenamos los valores a a propiedad de la tabla
      this.propiedadesTabla.response = response;
      this.propiedadesTabla.columnas = ["ID","",""];
      this.propiedadesTabla.claves = ["material_id","",""];
      this.propiedadesTabla.botones.ver = true;
      this.propiedadesTabla.botones.editar = true;
      this.propiedadesTabla.botones.borrar = true;
      this.propiedadesTabla.url_param = "stock";
      this.isUpdated = !this.isUpdated;
    } catch(error){
      this.notificacionesService.showError("Algo ha ido mal al cargar la tabla");
      console.log(error)
    }
  }

}