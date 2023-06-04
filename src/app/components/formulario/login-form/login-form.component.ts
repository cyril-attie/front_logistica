import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosServiceService } from 'src/app/servicios/usuarios-service.service';

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
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ])
    })
  }
  
  //Función que se lanza al realizar el submit en el form
  async onSubmitLogin() : Promise<void> {
    const response = await this.usuariosService.login(
                      this.formModel.value);
    if (!response.token) {
      return alert("No ha ido bien");
    } 
    
    localStorage.setItem('token_almacen', response.token);
    this.usuariosService.changeLogin(true);
    this.router.navigate(['/pedidos']);

  }
}
