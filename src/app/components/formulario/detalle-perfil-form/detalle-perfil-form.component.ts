import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosServiceService } from 'src/app/servicios/usuarios-service.service';

@Component({
  selector: 'app-detalle-perfil-form',
  templateUrl: './detalle-perfil-form.component.html',
  styleUrls: ['./detalle-perfil-form.component.sass']
})
export class DetallePerfilFormComponent implements OnInit {
  imagen: string = '';
  nombre: string = '';
  apellido: string = '';
  mail: string = '';
  edad: string = '';
  ciudad: string = '';
  pais: string = '';
  estado: number = 0;
  rol: number = 0;
   
  id:string|null="";

  constructor(
    private userService: UsuariosServiceService,
    ){

  }
  

  ngOnInit(): void {
    debugger;
    this.id = localStorage.getItem('usuarios_id');
    
}

};

/*
  
  ngOnInit(): void{
    const pantallaLogin = this.activatedRoute.data.subscribe.pantallaLogin;
    let id = localStorage.getItem('usuario_id');
    //Quiero coger aquí el id del localStorage
   
      //let id: number = parseInt(localStorage.getItem('usuario_id') || '0');
      // let id: number = (params.id)

      // Aquí lo quiero sacar por consola
      console.log('id', id)

     
    }
  }
*/
  

  // Estado -> en la bbdd es activo 1, inactivo 0
  // Rol --> en la bbdd es roles_id: 

  /*
  Superusuario : 1
  JefeDeEquipo : 2
  Encargado : 3
  Operario : 4  
  */







