import { Component } from '@angular/core';
import { UsuariosServiceService } from 'src/app/servicios/usuarios-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  isLogged : boolean;

  constructor(private usuariosServices: UsuariosServiceService) {
    this.isLogged = false;
  }

  ngOnInit() {
    //Sabemos si esta logeado o no en esta propiedad - APSP
    this.usuariosServices.isLogged.subscribe(value => {
      this.isLogged = value;
    });
  }

}
