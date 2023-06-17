import { Component } from '@angular/core';
import { UsuariosServiceService } from './servicios/usuarios-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'front_logistica';
  isLogged : boolean;

  constructor(private usuariosServices: UsuariosServiceService) {
    this.isLogged = false;
  }
  
   //Sabemos si esta logeado o no, con esta propiedad "isLogged" - APSP
  ngOnInit() {
    this.usuariosServices.isLogged.subscribe(value => {
      this.isLogged = value;
    });
  }
}
