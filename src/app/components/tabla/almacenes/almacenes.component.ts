import { Component } from '@angular/core';
import { PropiedadesTabla } from 'src/app/interfaces/propiedades-tabla';
import { AlmacenService } from 'src/app/servicios/almacen.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';

@Component({
  selector: 'app-almacenes',
  templateUrl: './almacenes.component.html',
  styleUrls: ['./almacenes.component.sass']
})
export class AlmacenesComponent {
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


  constructor(private almacenService: AlmacenService,
              private notificacionesService: NotificacionesService) {}

  async ngOnInit(): Promise<void> {
    
    try{
      let response = await this.almacenService.getAll();
      //Almacenamos los valores a a propiedad de la tabla
      this.propiedadesTabla.response = response;
      console.log(response);
      this.propiedadesTabla.columnas = ["ID","Nombre","Localidad","Pais","Capacidad Almacén"];
      this.propiedadesTabla.claves = ["almacenes_id","nombre_almacen","localidad","pais","capacidad_almacen"];
      this.propiedadesTabla.botones.ver = true;
      this.propiedadesTabla.botones.editar = true;
      this.propiedadesTabla.botones.borrar = true;
      this.propiedadesTabla.url_param = "almacen";
      this.isUpdated = !this.isUpdated;

    } catch(error){
      console.log(error)
    }
  }
}
