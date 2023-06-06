import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-detalle-almacen-form',
  templateUrl: './detalle-almacen-form.component.html',
  styleUrls: ['./detalle-almacen-form.component.sass']
})
export class DetalleAlmacenFormComponent implements OnInit {

  detalleAlmacen: FormGroup
  constructor() {
    this.detalleAlmacen = new FormGroup({
      nombre_almacen: new FormControl('', []),
      calle: new FormControl('', []),
      localidad: new FormControl('', []),
      pais: new FormControl('', []),
      codigo_postal: new FormControl('', []),
      latitud: new FormControl('', []),
      longitud: new FormControl('', []),
      capacidad: new FormControl('', []),
    }, []);
  }

  ngOnInit(): void { }

  recogerDatosForm() {
    console.log(this.detalleAlmacen.value)
  }
}