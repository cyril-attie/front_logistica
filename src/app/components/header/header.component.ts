import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosServiceService } from 'src/app/servicios/usuarios-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  isLogged : boolean;
  rol : Number;

  constructor(private usuariosServices: UsuariosServiceService,
              private router: Router) {
    this.isLogged = false;
    this.rol = 0;
  }

  ngOnInit() {
    //Sabemos si esta logeado o no, con esta propiedad "isLogged" - APSP
    this.usuariosServices.isLogged.subscribe(value => {
      this.isLogged = value;
    });
    //Sabemos que rol tiene con la propiedad "rol" - APSP
    this.usuariosServices.rol.subscribe(value => {
      this.rol = value;
    });
  }

  logout() {
    localStorage.removeItem('token_almacen');
    localStorage.removeItem('rol_almacen');
    this.usuariosServices.changeLogin(false);
    this.usuariosServices.changeRol(0);
    this.router.navigate(['/login']);
  }

}
