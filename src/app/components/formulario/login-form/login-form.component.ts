import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosServiceService } from 'src/app/servicios/usuarios-service.service';
import jwtDecode from "jwt-decode";
import * as myGlobals from './../../../general/globals';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})

export class LoginFormComponent {
  formModel : FormGroup;
  
  constructor(
    private usuariosService : UsuariosServiceService,
    private router : Router
  ) {
    this.formModel = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      ]),
      contrasena: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ])
    })
  }
  
  //Función que se lanza al realizar el submit en el form
  async onSubmitLogin() : Promise<void> {
    const response = await this.usuariosService.login(
                      this.formModel.value);
    
    //Mensaje de error si no va bien
    if (!response.token) {
      return alert("No ha ido bien");
    } 
    
    //Obtenemos rol
    const tokenDecode = 
        jwtDecode<{ roles_id: string, 
                    user_id: number, 
                    iat: number, 
                    exp: number 
                  }>(response.token!);

    //Mensaje de error si no se obtiene el rol
    if (!tokenDecode){
      return alert("No ha ido bien por el rol");
    }

    //Guardamos en variables del navegador
    localStorage.setItem('token_almacen', response.token);
    localStorage.setItem('rol_almacen', tokenDecode.roles_id);
    localStorage.setItem('usuario_id', tokenDecode.user_id.toString())
    console.log("Te has logedo correctamente - " + response.token + " - " + tokenDecode.roles_id );
  
    debugger;
    console.log("Te has logedo correctamente - " + response.token + " - " + tokenDecode.roles_id);
  
    //Actualizamos variable de login
    this.usuariosService.changeLogin(true);
    this.usuariosService.changeRol(parseInt(tokenDecode.roles_id));
    this.router.navigate(['/pedidos']);

  }
}
