import { Component } from '@angular/core';
import { PropiedadesTabla } from 'src/app/interfaces/propiedades-tabla';
import { MaterialService } from 'src/app/servicios/material.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { TablaRefreshService } from 'src/app/servicios/tabla-refresh.service';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.sass']
})
export class MaterialesComponent {



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
    private materialesService: MaterialService, 
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
        let response = await this.materialesService.getAll();
        if (response.fatal) {
          return this.notificacionesService.showError(response.fatal);
        }
        console.log(response);
        //Almacenamos los valores a a propiedad de la tabla
        this.propiedadesTabla.response = response;
        this.propiedadesTabla.columnas = ["ID","Nombre", "Estado","Categoría","Peso","Descripción"];
        this.propiedadesTabla.claves = ["materiales_id","nombre", "estado","categorias_materiales_id","peso","descripcion_material"];
        this.propiedadesTabla.botones.editar = true;
        this.propiedadesTabla.botones.borrar = true;
        this.propiedadesTabla.url_param = "material";
        this.propiedadesTabla.url_api = "materiales";
        this.isUpdated = !this.isUpdated;
      } catch(error){
        this.notificacionesService.showError("Algo ha ido mal al cargar la tabla, mira el error en la consola");
        console.log(error)
      }
    }

}
