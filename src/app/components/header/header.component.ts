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

  constructor(private usuariosServices: UsuariosServiceService,
              private router: Router) {
    this.isLogged = false;
  }

  ngOnInit() {
    //Sabemos si esta logeado o no, con esta propiedad "isLogged" - APSP
    this.usuariosServices.isLogged.subscribe(value => {
      this.isLogged = value;
    });
  }

  logout() {
    localStorage.removeItem('token_almacen');
    this.usuariosServices.changeLogin(false);
    this.router.navigate(['/login']);
  }

}
