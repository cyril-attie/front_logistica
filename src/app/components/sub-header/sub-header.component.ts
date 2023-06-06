import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UsuariosServiceService } from 'src/app/servicios/usuarios-service.service';
import * as myGlobals from '../../general/globals';


@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.sass']
})
export class SubHeaderComponent implements OnInit {
  
  rol: Number;
  usuario: string = "";

  rolesMap = new Map<Number, string>([
    [myGlobals.rolJefeDeEquipo, 'Jefe de equipo'],
    [myGlobals.rolEncargado, 'Encargado'],
    [myGlobals.rolOperario, 'Operario']
  ]);

  constructor(
    private usuariosService: UsuariosServiceService,
    private router: Router
  ){

    this.rol = 0;

  }

  ngOnInit(){

     this.usuariosService.rol.subscribe(value => {
      this.rol = value;
      this.usuario = this.rolesMap.get(value) || "";});

      // OPCIÓN MANUAL 
      /*
      if (this.rol === 2){
        this.usuario = 'Jefe de equipo'
      } else if (this.rol === 3){
        this.usuario = 'Encargado'
      } else if (this.rol === 4) {
        this.usuario = 'Operario'
      }; 

      */

  }
}
