import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosServiceService } from 'src/app/servicios/usuarios-service.service';
import * as myGlobals from '../../../general/globals';
import { Usuario } from 'src/app/interfaces/usuario';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';

@Component({
  selector: 'app-detalle-perfil-form',
  templateUrl: './detalle-perfil-form.component.html',
  styleUrls: ['./detalle-perfil-form.component.sass']
})
export class DetallePerfilFormComponent implements OnInit {
  imagen: string = 'https://cdn-images.livecareer.es/pages/foto_cv_lc_es_3.jpg';
 
  usuario : Usuario | any = {};
  id: number = 0;
  notificacionesService = inject(NotificacionesService)

  rolesMap = new Map<Number, string>([
    [myGlobals.rolJefeDeEquipo, 'Jefe de equipo'],
    [myGlobals.rolEncargado, 'Encargado'],
    [myGlobals.rolOperario, 'Operario']
  ]);

  constructor(
    private usuarioService: UsuariosServiceService,
    ){

  }
  

  async ngOnInit(): Promise<void> {
    //debugger;
    const idString : number | any = localStorage.getItem('usuarios_id');
    this.id = parseInt(idString);

    // Asignarle un numero al rol para que en el ngClass del html se pinte un color u otro según su rol
    try {
      let response = await this.usuarioService.getById(this.id);
      console.log(response);
      const usuario: Usuario = response[0]; 
      this.usuario = usuario
    } catch (err) {
      this.notificacionesService.showError("error al solicitar perfil");
    }
  }
}
