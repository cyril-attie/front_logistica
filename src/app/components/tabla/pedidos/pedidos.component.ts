import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interfaces/pedido';
import { PedidosService } from 'src/app/servicios/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.sass']
})
export class PedidosComponent implements OnInit {

  misPedidos: Pedido[] = []
  constructor(private pedidosService: PedidosService) { }

  async ngOnInit(): Promise<void> {
    try {
      let response = await this.pedidosService.getAll()
      //this.arrPedidos = response;

    } catch (error) {
      console.log(error)
    }
  }
}
