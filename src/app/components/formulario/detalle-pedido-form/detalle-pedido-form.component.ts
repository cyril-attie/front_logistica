import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-detalle-pedido-form',
  templateUrl: './detalle-pedido-form.component.html',
  styleUrls: ['./detalle-pedido-form.component.sass'],
})
export class DetallePedidoFormComponent implements OnInit {

  nuevoPedido: FormGroup
  constructor() {
    this.nuevoPedido = new FormGroup({
      fecha_creacion: new FormControl('', []),
      estado: new FormControl('', []),
      operario_asignado: new FormControl('', []),
      fecha_salida: new FormControl('', []),
      fecha_llegada: new FormControl('', []),
      camion_asignado: new FormControl('', []),
      capacidad: new FormControl('', []),
      medida: new FormControl('', []),
      usuario_creador: new FormControl('', []),
      almacen_origen: new FormControl('', []),
      almacen_destino: new FormControl('', []),
      observaciones: new FormControl('', []),
      n_material: new FormControl('', []),
      nombre_material: new FormControl('', []),
      categoria: new FormControl('', []),
      stock: new FormControl('', []),
      stock_total: new FormControl('', []),
    }, []);
  }

  ngOnInit(): void { }

  recogerDatosForm() {
    console.log(this.nuevoPedido.value)
  }
}
