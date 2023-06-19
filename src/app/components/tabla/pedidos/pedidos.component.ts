import { Component, OnInit, inject } from '@angular/core';
import { PropiedadesTabla } from 'src/app/interfaces/propiedades-tabla';
import { Pedido } from 'src/app/interfaces/pedido';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { TablaRefreshService } from 'src/app/servicios/tabla-refresh.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.sass']
})
export class PedidosComponent {

  //Definimos estas propiedades ya que les pasaremos al componente tabla en el
  //html
  propiedadesTabla: PropiedadesTabla = {
    response: [],
    columnas: [],
    claves: [],
    botones: {
      editar : false,
      borrar: false,
    },
    url_param: "",
    url_api: ""
  };
  //Definimos este campo para actualizar la tabla en el componente hijo
  isUpdated : boolean = false;

  notificacionesService = inject(NotificacionesService)

  constructor(private pedidoService: PedidosService, 
              private tablaRefreshService: TablaRefreshService)
  {
    //Esta suscrito al obserbale refreshTablaSubject, cuando carga este componente detecta un cambio y lanza la acción pintarTabla()
    this.tablaRefreshService.refreshTablaSubject.subscribe(value => {
        this.pintarTabla()
    });
  }

  async pintarTabla() :Promise<void> {
    try{
      let response = await this.pedidoService.getAll();
      if (response.fatal) {
        return this.notificacionesService.showError(response.fatal);
      }
      //Almacenamos los valores a a propiedad de la tabla
      this.propiedadesTabla.response = response;
      this.propiedadesTabla.columnas = ["Nºpedido","Estado","Fecha de salida", "Fecha de llegada", "Usuario asignado"];
      this.propiedadesTabla.claves = ["pedidos_id","estado_pedido","fecha_salida", "fecha_llegada","usuarios_id_creador"];
      this.propiedadesTabla.botones.editar = true;
      this.propiedadesTabla.botones.borrar = true;
      this.propiedadesTabla.url_param = "pedido";
      this.propiedadesTabla.url_api = "pedidos";
      this.isUpdated = !this.isUpdated;
    } catch(error){
      this.notificacionesService.showError("Algo ha ido mal al cargar la tabla");
      console.log(error)
    }
  }

}