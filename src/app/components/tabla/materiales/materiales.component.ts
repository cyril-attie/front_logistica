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
      ver : false,
      editar : false,
      borrar: false,
    },
    url_param: ""
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
        console.log(response);
        //Almacenamos los valores a a propiedad de la tabla
        this.propiedadesTabla.response = response;
        this.propiedadesTabla.columnas = ["ID","Nombre","Estado","Categoría","Peso","Stock","Descripción"];
        this.propiedadesTabla.claves = ["materiales_id","nombre","estado","categoria","peso","stock","descripcion_rol"];
        this.propiedadesTabla.botones.ver = true;
        this.propiedadesTabla.botones.editar = true;
        this.propiedadesTabla.botones.borrar = true;
        this.propiedadesTabla.url_param = "material";
        this.isUpdated = !this.isUpdated;
      } catch(error){
        this.notificacionesService.showError("Algo ha ido mal al cargar la tabla, mira el error en la consola");
        console.log(error)
      }
    }

}
