import { Component } from '@angular/core';
import { PropiedadesTabla } from 'src/app/interfaces/propiedades-tabla';
import { CamionesService } from 'src/app/servicios/camiones.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { TablaRefreshService } from 'src/app/servicios/tabla-refresh.service';

@Component({
  selector: 'app-camiones',
  templateUrl: './camiones.component.html',
  styleUrls: ['./camiones.component.sass']
})
export class CamionesComponent {


  propiedadesTabla: PropiedadesTabla = {
    response: [],
    columnas: [],
    claves: [],
    botones: {
      editar : false,
      borrar: false,
    },
    url_param: "",
    url_api:""
  };

  isUpdated : boolean = false;

  
  constructor(
    private camionesService: CamionesService , 
    private tablaRefreshService: TablaRefreshService,
    private notificacionesService: NotificacionesService)
    {
      //Pintamos la tabla con los datos
      this.tablaRefreshService.refreshTablaSubject.subscribe(value => {
          this.pintarTabla()
      });
    }
  
    // Recuperamos los datos
    async pintarTabla() :Promise<void> {
      try{
        let response = await this.camionesService.getAll();
        if (response.fatal) {
          return this.notificacionesService.showError(response.fatal);
        }
        //Almacenamos los valores a a propiedad de la tabla
        this.propiedadesTabla.response = response;
        this.propiedadesTabla.columnas = ["ID","Matrícula","Capacidad", "Estado"];
        this.propiedadesTabla.claves = ["camiones_id","matricula_camion","capacidad_maxima", "estado"];
        this.propiedadesTabla.botones.editar = true;
        this.propiedadesTabla.botones.borrar = true;
        this.propiedadesTabla.url_param = "camion";
        this.propiedadesTabla.url_api = "camiones";
        this.isUpdated = !this.isUpdated;
      } catch(error){
        this.notificacionesService.showError("Algo ha ido mal al cargar la tabla, mira el error en la consola");
        console.log(error)
      }
    }

}
