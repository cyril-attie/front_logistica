import { Component } from '@angular/core';
import { PropiedadesTabla } from 'src/app/interfaces/propiedades-tabla';
import { CategoriasMaterialesService } from 'src/app/servicios/categorias-materiales.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { TablaRefreshService } from 'src/app/servicios/tabla-refresh.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.sass']
})
export class CategoriasComponent {

  isUpdated : boolean = false;
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


  constructor(
    private categoriasService: CategoriasMaterialesService,
    private tablaRefreshService: TablaRefreshService,
    private notificacionesService: NotificacionesService
  ){
    this.tablaRefreshService.refreshTablaSubject.subscribe(value => {
        this.pintarTabla()
    });
  }

  // Recuperamos los datos
  async pintarTabla() :Promise<void> {
    try{
      let response = await this.categoriasService.getAll();
      if (response.fatal) {
        return this.notificacionesService.showError(response.fatal);
      }
      //Almacenamos los valores a a propiedad de la tabla
      this.propiedadesTabla.response = response;
      this.propiedadesTabla.columnas = ["ID","Nombre","Comentarios"];
      this.propiedadesTabla.claves = ["categorias_materiales_id", "descripcion","comentario"];
      this.propiedadesTabla.botones.editar = true;
      this.propiedadesTabla.botones.borrar = true;
      this.propiedadesTabla.url_param = "categoria";
      this.propiedadesTabla.url_api = "categorias";
      this.isUpdated = !this.isUpdated;
    } catch(error){
      this.notificacionesService.showError("Algo ha ido mal al cargar la tabla, mira el error en la consola");
      console.log(error)
    }
  }

}
