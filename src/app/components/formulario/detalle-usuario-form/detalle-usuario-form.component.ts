import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { UsuariosServiceService } from 'src/app/servicios/usuarios-service.service';
import { Pipe } from '@angular/core';
import { __values } from 'tslib';

@Component({
  selector: 'app-detalle-usuario-form',
  templateUrl: './detalle-usuario-form.component.html',
  styleUrls: ['./detalle-usuario-form.component.sass']
})
export class DetalleUsuarioFormComponent implements OnInit {

  usuarios: Usuario[] = [];


  title: string = "Registrar";
  id: number = 0;
  usuarioForm: FormGroup;
  isUpdate: boolean = false;
  buttonName: string = "";
  imageProfile: string = "";


  notificacionesService = inject(NotificacionesService);

  constructor(
    private usuarioService: UsuariosServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    /* EL USUARIO NO EXISTE --> CAMPOS CREAR USUARIO */

    // El formulario aparecerá vacío
    this.usuarioForm = new FormGroup({
      usuarios_id: new FormControl('', []),
      nombre: new FormControl('', [
        Validators.required
      ]),
      usuarios_id_lider: new FormControl('', [
        Validators.required
      ]),
      apellido: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      ]),
      contrasena: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      pais: new FormControl('', [
        Validators.required
      ]),
      ciudad: new FormControl(''),
      codigo_postal: new FormControl('', [
        Validators.minLength(3),
        Validators.required
      ]),
      edad: new FormControl(''),
      activo: new FormControl(false),
      imagen: new FormControl(''),
      roles_id: new FormControl('', [
        Validators.required
      ])
    }, []);
  };


  /** Acción que se lanza al hacer submit */
  async submitUsuario() {

    const usuario = this.usuarioForm.value;
    //Quitamos el id ya que no queremos que se envíe en el body
    delete usuario["usuarios_id"];

    //Crear
    if (!this.isUpdate) {
      try {
        const response = await this.usuarioService.create(usuario);
        console.log(response);
        if (response.fatal) {
          return this.notificacionesService.showError(response.fatal);
        }
        this.isUpdate = true;
        return this.notificacionesService.showInfo("Se ha creado correctamente el usuario");
      } catch (error) {
        console.log(error);
        return this.notificacionesService.showError("No se ha creado correctamente el usuario.");
      }
    }

    //Actualizar
    try {
      //Al actualizar no podemos actualizar a los roles 1 y 2 ni el usarios_id_lider
      delete usuario["usuarios_id_lider"];
      if (usuario.roles_id == 1 || usuario.roles_id == 2) {
        delete usuario["roles_id"];
      }

      const response = await this.usuarioService.update(usuario, this.id);
      if (response.fatal) {
        return this.notificacionesService.showError(response.fatal);
      }
      this.notificacionesService.showInfo("Se ha actualizado correctamente el usuario");
    } catch (error) {
      console.log(error);
      this.notificacionesService.showError('No se ha actualizado correctamente el usuario.');
    }

  };


  /* Cuando se le de al botón de cancelar*/
  cancelar() {
    this.router.navigate(['/usuarios']);
  }


  /* Cuando se incia el componente se verifica si es creación o no, si es actualización se informan campos del formulario */
  ngOnInit(): void {

    this.activatedRoute.params.subscribe(async (params: any): Promise<void> => {
      this.id = (params.id);

      //Si esta crendo un nuevo usuario entrara aqui
      if (!this.id) {
        this.isUpdate = false;
        this.buttonName = "Crear";
        return;
      }
      //Si esta actualizando un usuario entrara aqui
      this.isUpdate = true;
      this.buttonName = "Actualizar";

      // Activa los botones 'Editar usuario' y 'Eliminar' 
      try {
        let response: any = await this.usuarioService.getById(this.id);
        if (response.fatal) {
          return this.notificacionesService.showError(response.fatal);
        }
        this.rellenarCamposForm(response);
      } catch (err) {
        console.log(err);
        this.notificacionesService.showError("No ha cargado correctamente el usuario");
      }
    })
  };


  /* Acción que rellena los campos del formulario */
  rellenarCamposForm(response: any) {

    const usuario: Usuario = response[0];

    this.imageProfile = response[0].imagen;
    this.usuarioForm = new FormGroup({
      usuarios_id: new FormControl(usuario.usuarios_id, [
        Validators.required
      ]),
      usuarios_id_lider: new FormControl(usuario.usuarios_id_lider, [
        Validators.required
      ]),
      nombre: new FormControl(usuario.nombre, [
        Validators.required
      ]),
      apellido: new FormControl(usuario.apellido, [
        Validators.required
      ]),
      email: new FormControl(usuario.email, [
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      ]),
      contrasena: new FormControl(usuario.contrasena, [
        Validators.required,
        Validators.minLength(3)
      ]),
      pais: new FormControl(usuario.pais, [
        Validators.required
      ]),
      ciudad: new FormControl(usuario.ciudad),
      codigo_postal: new FormControl('', [
        Validators.minLength(3),
        Validators.required
      ]),
      edad: new FormControl(usuario.edad),
      activo: new FormControl(usuario.activo),
      imagen: new FormControl(usuario.imagen),
      roles_id: new FormControl(usuario.roles_id, [
        Validators.required
      ])
    }, []);
  }

  //Métodos para la imágen
  updateImage($event: any): void {
    let valorImagen = $event.target.value;
    this.imageProfile = valorImagen;
  }

  //Control de errores del form
  controlError(nombreCampo: string, tipoError: string): boolean {
    if (this.usuarioForm.get(nombreCampo)?.hasError(tipoError) &&
      this.usuarioForm.get(nombreCampo)?.touched) {
      return true
    }
    return false
  }
}
