import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-detalle-material-form',
  templateUrl: './detalle-material-form.component.html',
  styleUrls: ['./detalle-material-form.component.sass']
})
export class DetalleMaterialFormComponent implements OnInit {

  detalleMaterial: FormGroup
  constructor() {
    this.detalleMaterial = new FormGroup({
      n_material: new FormControl('', []),
      nombre: new FormControl('', []),
      estado: new FormControl('', []),
      categoria: new FormControl('', []),
      peso: new FormControl('', []),
      stock: new FormControl('', []),
      descripcion: new FormControl('', []),
    }, []);
  }

  ngOnInit(): void { }

  recogerDatosForm() {
    console.log(this.detalleMaterial.value)
  }
}
