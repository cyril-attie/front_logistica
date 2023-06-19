import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UsuariosServiceService } from 'src/app/servicios/usuarios-service.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { RolesService } from 'src/app/servicios/roles.service';


@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.sass']
})
export class SubHeaderComponent implements OnInit {
  
  rol: Number;
  rolDescripcion: string | any = "";
  enlacesRouter : any[] = []; 
  colorBorder: string = "";
  colorText: string = "";
  
  rolesService = inject(RolesService);

  rolesMap = new Map<Number, string>([
    [this.rolesService.rolJefeDeEquipo, 'JEFE DE EQUIPO'],
    [this.rolesService.rolEncargado, 'ENCARGADO'],
    [this.rolesService.rolOperario, 'OPERARIO']
  ]);

  constructor(
    private usuarioService: UsuariosServiceService,
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ){

    this.rol = 0;

  }

  /**APSP - Guardamos en un array el nombre de la pestaña
   * y la ruta que se abre para cada caso dependiendo del
   * rol del usuario.Con Map bindemos el codigo del rol
   * con su decripción. Despues en el HTML iteramos y pintamos.
   */
  ngOnInit(): void {
    // roles
    this.usuarioService.rol.subscribe(value => {
      this.rol = value;
      this.rolDescripcion = this.rolesMap.get(value);

      if (this.rol == this.rolesService.rolJefeDeEquipo) {
        this.enlacesRouter =[
          { texto: 'Pedidos', enlace: ['/pedidos'] },
          { texto: 'Almacenes', enlace: ['/almacenes'] },
          { texto: 'Camiones', enlace: ['/camiones'] },
          { texto: 'Materiales', enlace: ['/materiales'] },
          { texto: 'Categorias', enlace: ['/categorias'] },
          { texto: 'Usuarios', enlace: ['/usuarios'] },
          { texto: 'Perfil', enlace: ['/perfil'] }
        ];
        this.colorBorder = "rgba(16, 93, 148, 1)";
        this.colorText = "white";
      }

      if (this.rol == this.rolesService.rolEncargado) {
        this.enlacesRouter =[
          { texto: 'Pedidos', enlace: ['/pedidos'] },
          { texto: 'Almacenes', enlace: ['/almacenes'] },
          { texto: 'Materiales', enlace: ['/materiales'] },
          { texto: 'Categorias', enlace: ['/categorias'] },
          { texto: 'Perfil', enlace: ['/perfil'] }
        ];
        this.colorBorder = "#af3216";
        this.colorText = "white";
      }

      if (this.rol == this.rolesService.rolOperario) {
        this.enlacesRouter =[
          { texto: 'Pedidos', enlace: ['/pedidos'] },
          { texto: 'Camiones', enlace: ['/camiones'] },
          { texto: 'Perfil', enlace: ['/perfil'] }
        ];
        this.colorBorder = "rgb(224 212 47)";
        this.colorText = "black";

      }
    });
    
     

  }
}

