import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, inject } from '@angular/core';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { UsuariosServiceService } from 'src/app/servicios/usuarios-service.service';
import Swal from 'sweetalert2';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { AlmacenService } from 'src/app/servicios/almacen.service';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.sass']
})

export class DeleteButtonComponent {

  @Input() url_param : string = "";
  @Input() id : number | undefined;

  userService = inject(UsuariosServiceService);
  pedidoService= inject(PedidosService);
  alamacenService = inject(AlmacenService);
  
  notificacionesService = inject(NotificacionesService);
  location = inject(Location);
  activatedRoute= inject(ActivatedRoute);

  modalDelete(url_name:string,id: number | undefined) : void {
    Swal.fire({
      title: 'Deseas borrar el ' + url_name + ' ' + id + ' ?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        //consultar al servicio para hacer el borrado.
        this.deleteInstance(url_name,id);
      } 
    })
  }

  async deleteInstance(url_name: string, id: number | undefined): Promise<void> {
    
    if (id == undefined) {
      return;
    }
    
    try {
      
      //Miramos que servicio debemos consultar
      let response : any;
      switch (url_name) {
        case 'usuario':
          response = await this.userService.delete(id);
          break;
        case 'pedido':
          response = await this.pedidoService.delete(id);
          break;
        case 'almacen':
          response = await this.pedidoService.delete(id);
          break;
        case 'camion':
          break;
        case 'material':
          break;
        default: 
          this.notificacionesService.showError("no esta bien programado error con el parametro url_param");
      }

      //Si va mal devolvemos error
      console.log(response);
      if (!response) {
        this.notificacionesService.showError("no esta bien programado error con el parametro url_param");
        return;
      }
      if(response.fatal) {
        this.notificacionesService.showError(response.fatal);
        return;
      }
      
      //Lanzamos mensaje de que todo ha ido bien
      Swal.fire(
        'Borrado!',
        'Se a borrado el usuario ' + response.username + ' correctamente.',
        'success'
      )
      
      //Si tiene params significara que esta en la vista editar,sino en la tabla
      this.activatedRoute.params.subscribe( async (params: any) : Promise<void> => {
        if (params.id) {
          this.location.back();
        } 
        //APSP -> FALTA HACER EL CASO QUE ACTUALIZE LAS TABLAS
      });

    } catch (err) {
      return this.notificacionesService.showError("Algo ha ido mal");
      console.log(err);
    }
  }
}
