import { Component, OnInit } from '@angular/core';
import { UsuariosServiceService } from 'src/app/servicios/usuarios-service.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.sass']
})
export class UsuariosComponent implements OnInit{

  arrUsuariosComponent: string[] = [];

  constructor(private userService: UsuariosServiceService){}

  async ngOnInit(): Promise<void> {

    try{
      let response = await this.userService.getAll()
      console.log(response)

    } catch(error){
      console.log(error)

    }
    
  }

}
