import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosServiceService } from 'src/app/servicios/usuarios-service.service';
import * as myGlobals from '../../../general/globals';

@Component({
  selector: 'app-detalle-perfil-form',
  templateUrl: './detalle-perfil-form.component.html',
  styleUrls: ['./detalle-perfil-form.component.sass']
})
export class DetallePerfilFormComponent implements OnInit {
  imagen: string = 'https://cdn-images.livecareer.es/pages/foto_cv_lc_es_3.jpg';
  nombre: string = '';
  apellido: string = '';
  mail: string = '';
  edad: string = '';
  ciudad: string = '';
  pais: string = '';
  estado: number = 0;
  rol: Number = 0;
   
  id:string|null="";

  usuario: string = "";

  rolesMap = new Map<Number, string>([
    [myGlobals.rolJefeDeEquipo, 'Jefe de equipo'],
    [myGlobals.rolEncargado, 'Encargado'],
    [myGlobals.rolOperario, 'Operario']
  ]);

  constructor(
    private usuarioService: UsuariosServiceService,
    ){

  }
  

  ngOnInit(): void {
    //debugger;
    this.id = localStorage.getItem('usuarios_id');
    console.log('id', this.id) // null


    // Asignarle un numero al rol para que en el ngClass del html se pinte un color u otro según su rol

    this.usuarioService.rol.subscribe(value => {
      this.rol = value;
      this.usuario = this.rolesMap.get(value) || "";});


      // let response = this.usuarioService.getById(id);
      // this.estado = response[0] --> buscar el valor del estado activo/inactivo y parsear






    
  };
}









