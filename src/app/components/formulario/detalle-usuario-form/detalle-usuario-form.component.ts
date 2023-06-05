import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalle-usuario-form',
  templateUrl: './detalle-usuario-form.component.html',
  styleUrls: ['./detalle-usuario-form.component.sass']
})
export class DetalleUsuarioFormComponent implements OnInit{

  usuarioForm: FormGroup;

  constructor(){
    this.usuarioForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]),
      contrasena: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      pais: new FormControl('', [Validators.required]),
      ciudad: new FormControl('', [Validators.required]),
      codigo_postal: new FormControl('', [
        Validators.required, 
        Validators.pattern('^(0[1-9]|[1-4]\\d|5[0-2])\\d{3}$')]),
      edad: new FormControl('', [Validators.required]),
      rol: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
    }, []);
  }

  ngOnInit(){
  }


  datosUsuarios(){
    this.usuarioForm.value

  }
}
