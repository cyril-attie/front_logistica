import { Component, OnInit, inject } from '@angular/core';
import { PropiedadesTabla } from 'src/app/interfaces/propiedades-tabla';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosServiceService } from 'src/app/servicios/usuarios-service.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.sass']
})
export class UsuariosComponent implements OnInit{

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

  notificacionesService = inject(NotificacionesService)

  constructor(private userService: UsuariosServiceService) {}

  async ngOnInit(): Promise<void> {
    
    try{
      let response = await this.userService.getAll();
      //Almacenamos los valores a a propiedad de la tabla
      this.propiedadesTabla.response = response;
      this.propiedadesTabla.columnas = ["ID","Nombre","Email","Edad","Ciudad","Estado","Rol"];
      this.propiedadesTabla.claves = ["usuarios_id","nombre","email","edad","ciudad","pais","descripcion_rol"];
      this.propiedadesTabla.botones.ver = true;
      this.propiedadesTabla.botones.editar = true;
      this.propiedadesTabla.botones.borrar = true;
      this.propiedadesTabla.url_param = "usuario";
    } catch(error){
      console.log(error)
    }
  }

}
