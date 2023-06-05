import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosServiceService } from 'src/app/servicios/usuarios-service.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.sass']
})
export class UsuariosComponent implements OnInit{

  arrUsuarios: Usuario[] = [];

  constructor(private userService: UsuariosServiceService){}

  async ngOnInit(): Promise<void> {

    try{
      let response = await this.userService.getAll()
      this.arrUsuarios = response;

    } catch(error){
      console.log(error)
    }
  }

}
