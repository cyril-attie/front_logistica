import { Component, OnInit, inject } from '@angular/core';
import * as myGlobals from '../../../general/globals';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { PerfilesService } from 'src/app/servicios/perfiles.service';
import { Perfil } from 'src/app/interfaces/perfil';

@Component({
  selector: 'app-detalle-perfil-form',
  templateUrl: './detalle-perfil-form.component.html',
  styleUrls: ['./detalle-perfil-form.component.sass']
})
export class DetallePerfilFormComponent implements OnInit {
  imagen: string = 'https://www.dogalize.com/wp-content/uploads/2017/06/puppy-2298832_640.jpg';
  perfil : Perfil  = {
    nombre: '',
    apellido: '',
    edad: 0,
    email: '',
    ciudad: '',
    pais: '',
    estado: false,
    roles_id: 0
  };
  id: number = 0;
  notificacionesService = inject(NotificacionesService)

  rolesMap = new Map<Number, string>([
    [myGlobals.rolJefeDeEquipo, 'Jefe de equipo'],
    [myGlobals.rolEncargado, 'Encargado'],
    [myGlobals.rolOperario, 'Operario']
  ]);

  constructor(
    private perfilService: PerfilesService,
    ){}
  

  async ngOnInit(): Promise<void> {
    //debugger;
    const token : number | any = localStorage.getItem('token_almacen');
    console.log(token)

    // Asignarle un numero al rol para que en el ngClass del html se pinte un color u otro según su rol
    try {
      let response: Perfil | any = await this.perfilService.getPerfil();
      console.log('ESTOY PASANDO POR LA RESPONSE DE GETPERFIL()', response);
      this.perfil = response;
   
 
    } catch (err) {
      this.notificacionesService.showError("error al solicitar perfil");
    }
  
    // const token : number | any = localStorage.getItem('token_almacen');
    // console.log(token)


  }
}
