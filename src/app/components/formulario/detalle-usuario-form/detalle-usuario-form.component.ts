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
  id: number = 0;
  usuarioForm: FormGroup;
  usuarioExiste: boolean = false; 

  constructor(
    private usuarioService: UsuariosServiceService,
    private activdateRoute: ActivatedRoute,
    private router: Router)
      {

      /**
       ** EL USUARIO NO EXISTE --> CAMPOS CREAR USUARIO 
       **/  

      // Se verán los botones 'Crear nuevo usuario' y 'Cancelar'
      this.usuarioExiste = false; 

      // El formulario aparecerá vacío
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

  // Botón "Crear un nuevo usuario"
  async datosUsuario(){
    try { 
      const usuario =  this.usuarioForm.value;
      const response = await this.usuarioService.create(usuario);
      console.log("Has creado un nuevo usuario", response);

    } catch (error) {
      console.log(error);
      return alert('No has introducido los datos correctamente')
     
    }
   
  };

  // Botón "Editar usuario"
  async actualizar(){
    try{
      const usuario =  this.usuarioForm.value;
      const response = await this.usuarioService.update(usuario);

    }catch(error){
      console.log(error);
      return alert('No has actualizado los datos correctamente');
    }
  }

  // Botón "Cancelar"
  cancelar(){
    this.router.navigate(['/usuarios']);
  }


  // Botón "Eliminar"
  async eliminar(){
    try{
      const usuario =  this.usuarioForm.value;
      const response = await this.usuarioService.delete(usuario);
      alert("Has eliminado este usuario");
      this.router.navigate(['/usuarios']);

    }catch(error){
      console.log(error);
      return alert('No has eliminado el usuario, mira en la consola qué error ha surgido');
    }
  
  }



  /**
  ** EL USUARIO SÍ EXISTE --> CAMPOS RELLENADOS
  **/  



  ngOnInit(): void {
    this.activdateRoute.params.subscribe(async (params:any)=> {

      this.id = (params.id); 
      if (this.id) {

        //El título cambia a 'Actualizar'
        this.title = 'Actualizar';

        // Activa los botones 'Editar usuario' y 'Eliminar' 
        this.usuarioExiste = true; 
        let response: any = await this.usuarioService.getById(this.id);
        const usuario: Usuario = response; 

        // Los campos del formulario aparecen rellenados
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
}
