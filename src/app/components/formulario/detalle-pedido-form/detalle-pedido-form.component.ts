import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms'
import { Almacen } from 'src/app/interfaces/almacen';
import { AlmacenService } from 'src/app/servicios/almacen.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { StockService } from 'src/app/servicios/stock.service';

@Component({
  selector: 'app-detalle-pedido-form',
  templateUrl: './detalle-pedido-form.component.html',
  styleUrls: ['./detalle-pedido-form.component.sass'],
})
export class DetallePedidoFormComponent implements OnInit {


  almacenes: Almacen | any = [];
  nombresAlmacenes:  Almacen | any = [];
  pedidoForm: FormGroup;
  stocks: number = 0;
  
  
  constructor(
    private almacenesService: AlmacenService, 
    private notificacionesService: NotificacionesService, 
    private pedidosService: PedidosService,
    private stockService: StockService
  ) 
  
  {

    this.obtenerAlmacenes();
    this.pedidoForm = new FormGroup({
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

   // Creación de un nuevo pedido
   async recogerDatosForm() {
     
    try { 
      const pedido =  this.pedidoForm.value;
      const response = await this.pedidosService.create(pedido);
      this.notificacionesService.showInfo("Se ha creado correctamente el usuario");
      console.log(response);
    } catch (error) {
      console.log(error);
      this.notificacionesService.showError("No se ha creado correctamente el usuario.");
      
    }
    return;
  }


  ngOnInit(): void {
    this.obtenerAlmacenes();
  }

  // Obtención de los nombres de los almacenes para pintarlos en el html (almacen de origen / destino)
  async obtenerAlmacenes() : Promise<void>  {

    try {
      let response = await this.almacenesService.getAll();
      console.log(response); 
      this.almacenes = response;
      this.nombresAlmacenes = this.almacenes.map((almacen: any) => almacen.nombre_almacen);

      this.nombresAlmacenes = this.nombresAlmacenes.filter(
        (nombre : any, index: any) => this.nombresAlmacenes.indexOf(nombre) === index
      );
      // console.log(this.nombresAlmacenes)
      // this.almacenes = this.nombresAlmacenes; 
      
    }catch(error){
      this.notificacionesService.showError("Algo ha ido mal al cargar la tabla");
      console.log(error)
    }
  }


  obtenerStocks(){
    
  }
 
  // obtenerStocks() {
  //   const almacenSeleccionado = this.pedidoForm.get('almacen_origen')?.value;
  
  //   if (almacenSeleccionado) {
  //     this.stockService.obtenerStocksPorAlmacen(almacenSeleccionado).then(
  //       (response) => {
  //         // Asignar los datos de stocks a una variable en el componente
  //         // Por ejemplo, puedes crear un arreglo llamado 'stocks' y asignarle 'response' en esta línea
  
  //         this.stocks = response;
  //         console.log(response)
          
  //         // O puedes asignar los datos directamente a los controles del formulario si eso es lo que deseas hacer
  //         const stocksFormArray = this.pedidoForm.get('stocks') as FormArray;
  //         console.log(stocksFormArray)
  //         stocksFormArray.clear();
  
  //         for (const stock of response) {
  //           const stockGroup = new FormGroup({
  //             n_material: new FormControl(stock.n_material),
  //             nombre_material: new FormControl(stock.nombre_material),
  //             categoria: new FormControl(stock.categoria),
  //             stock: new FormControl(stock.stock),
  //             stock_total: new FormControl(stock.stock_total),
  //           });
  //           stocksFormArray.push(stockGroup);
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //   }
  // }



 
    };
  
  
