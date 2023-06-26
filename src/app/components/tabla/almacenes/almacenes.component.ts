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
      editar : false,
      borrar: false,
    },
    url_param: "",
    url_api:"",
  };
  //Definimos este campo para actualizar la tabla en el componente hijo
  isUpdated : boolean = false;


  constructor(private almacenService: AlmacenService,
              private notificacionesService: NotificacionesService) {}

  async ngOnInit(): Promise<void> {
    
    try{
      let response = await this.almacenService.getAll();
      if (response.fatal) {
        return this.notificacionesService.showError(response.fatal);
      }

      //Filtramos la response de tal manera que solo nos mande el almacén que tenga el encargado
      const rol : any = localStorage.getItem('rol_almacen');
      const user_id : any = localStorage.getItem('user_id');
      if (rol == "3") {//Si es encargado
        response = response.filter((almacen: any) => almacen.usuarios_id_encargado == user_id);
        response = response.map((almacen: any) => {
          return {
            ...almacen,
            stocks: almacen.stocks.filter((stock: any) => stock.usuarios_id_encargado == user_id)
          };
        });
      }

      
      //Almacenamos los valores a a propiedad de la tabla
      this.propiedadesTabla.response = response;
      console.log(response);
      this.propiedadesTabla.columnas = ["ID","Nombre","Localidad","Pais","Capacidad Almacén"];
      this.propiedadesTabla.claves = ["almacenes_id","nombre_almacen","localidad","pais","capacidad_almacen"];
      this.propiedadesTabla.botones.editar = true;
      this.propiedadesTabla.botones.borrar = true;
      this.propiedadesTabla.url_param = "almacen";
      this.propiedadesTabla.url_api = "almacenes";
      this.isUpdated = !this.isUpdated;

    } catch(error){
      console.log(error)
    }
  }
}
