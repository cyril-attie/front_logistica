import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosServiceService } from 'src/app/servicios/usuarios-service.service';

@Component({
  selector: 'app-detalle-usuario-form',
  templateUrl: './detalle-usuario-form.component.html',
  styleUrls: ['./detalle-usuario-form.component.sass']
})
export class DetalleUsuarioFormComponent implements OnInit{

  title: string = "Registrar";
  button: string = "Cancelar";
  id: number = 0;
  usuarioForm: FormGroup;

  constructor(
    private usuarioService: UsuariosServiceService,
    private activdateRoute: ActivatedRoute,
    private router: Router)
      {
      this.usuarioForm = new FormGroup({
        imagen: new FormControl('', [Validators.required]),
        nombre: new FormControl('', [Validators.required]),
        apellido: new FormControl('', [Validators.required]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]),
        contrasena: new FormControl('', [
          Validators.required,
          Validators.minLength(3)]),
        pais: new FormControl('', [Validators.required]),
        ciudad: new FormControl('', [Validators.required]),
        codigo_postal: new FormControl('', [
          Validators.required, 
          Validators.pattern('^(0[1-9]|[1-4]\\d|5[0-2])\\d{3}$')]),
        edad: new FormControl('', [Validators.required]),
        rol: new FormControl('', [Validators.required]),
        estado: new FormControl('', [Validators.required]),
      }, []);
  };


  datosUsuarios(){
    this.usuarioForm.value
  };


  ngOnInit(): void {
    this.activdateRoute.params.subscribe(async (params:any)=> {

      this.id = (params.id); 
      if (this.id) {
        this.title = 'Actualizar';
        this.button = 'Eliminar';
        let response: any = await this.usuarioService.getById(this.id);
        const usuario: Usuario = response; 


        this.usuarioForm = new FormGroup({
          imagen: new FormControl(usuario.imagen, [Validators.required]),
          nombre: new FormControl(usuario.nombre, [Validators.required]),
          apellido: new FormControl(usuario.apellido, [Validators.required]),
          email: new FormControl(usuario.email, [
            Validators.required,
            Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]),
          contrasena: new FormControl(usuario.contrasena, [
            Validators.required,
            Validators.minLength(3)
          ]),
          pais: new FormControl(usuario.pais, [Validators.required]),
          ciudad: new FormControl(usuario.ciudad, [Validators.required]),
          codigo_postal: new FormControl(usuario.codigo_postal, [
            Validators.required, 
            Validators.pattern('^(0[1-9]|[1-4]\\d|5[0-2])\\d{3}$')]),
          edad: new FormControl(usuario.edad, [Validators.required]),
          rol: new FormControl(usuario.rol, [Validators.required]),
          estado: new FormControl(usuario.estado, [Validators.required]),
        }, []);
      }



    }) 
  };


  cancelar(){
    this.router.navigate(['/usuarios']);
  }

  eliminar(){
    localStorage.removeItem('token_almacen');
    localStorage.removeItem('rol_almacen');
    this.usuarioService.changeLogin(false);
    this.usuarioService.changeRol(0);
    this.router.navigate(['/usuarios']);
  }

  
}
