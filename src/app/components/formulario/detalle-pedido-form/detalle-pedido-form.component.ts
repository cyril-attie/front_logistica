import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { Almacen } from 'src/app/interfaces/almacen';
import { Camion } from 'src/app/interfaces/camion';
import { Pedido } from 'src/app/interfaces/pedido';
import { PedidosHaveStock } from 'src/app/interfaces/pedidos-have-stock';
import { Stock } from 'src/app/interfaces/stock';
import { StockAlmacen } from 'src/app/interfaces/stock-almacen';
import { AlmacenService } from 'src/app/servicios/almacen.service';
import { CamionesService } from 'src/app/servicios/camiones.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { StockService } from 'src/app/servicios/stock.service';

@Component({
  selector: 'app-detalle-pedido-form',
  templateUrl: './detalle-pedido-form.component.html',
  styleUrls: ['./detalle-pedido-form.component.sass'],
})
export class DetallePedidoFormComponent implements OnInit {


  almacenes: Almacen[] | any = [];
  camiones: Camion[] | any = [];
  stocksOrigen: StockAlmacen[] = [];

  pedidoForm: FormGroup;

  stocks: number = 0;
  id: number = 0;
  title: string = "Registrar";
  isUpdate : boolean = false;
  buttonName : string = "";

  filasStock : PedidosHaveStock[] = [];
  fila : PedidosHaveStock | any = {};
  
  
  constructor(
    private almacenesService: AlmacenService, 
    private camionesService: CamionesService,
    private notificacionesService: NotificacionesService, 
    private pedidosService: PedidosService,
    private activatedRoute: ActivatedRoute,
    private stockService: StockService,
    private router: Router) 
  {
    const usuarioCreador = localStorage.getItem('user_id');
    const actualDate = formatDate(new Date(),'yyyy-MM-dd hh:mm:ss','en');

    this.pedidoForm = new FormGroup({
      pedidos_id: new FormControl('',[]), //Se informa al actualizar o cuando ya se ha creado
      fecha_salida: new FormControl('', [
        Validators.required
      ]),
      fecha_llegada: new FormControl('', [
        Validators.required
      ]),
      estado_pedido: new FormControl('En preparación', []),
      medida: new FormControl('', [
        Validators.required
      ]),
      fecha_creacion: new FormControl(actualDate, []), /*APSP: Se pone automaticamente con la fecha del dia de la creación del pedido */
      usuarios_id_creador: new FormControl(usuarioCreador, []), /*APSP: Se pone con el usuario que crea el pedido, es decir el operario */
      usuarios_id_revisador: new FormControl('', []), /*APSP: Se pone con el "usario_id_encargado" de la tabla almacenes del almacén detino*/
      almacenes_id_origen: new FormControl('', [
        Validators.required
      ]),
      almacenes_id_destion: new FormControl('', [
        Validators.required
      ]),
      camiones_id: new FormControl('', [
        Validators.required
      ]),
      usuario_id_aprobador: new FormControl('', []), /*APSP: Se pone con el "usario_id_encargado" de la tabla almacenes del almacén origen*/
      observaciones: new FormControl('', []), /*APSP: Digali al Cyril que el crei a la base de dates */
    }, []);
  }

   // Creación de un nuevo pedido
   async submitPedido() {
    
    //Crear
    if (!this.isUpdate){
      try { 
        const pedido =  this.pedidoForm.value;
        delete pedido["pedidos_id"];
        pedido.stocks = this.stocksFiltred(this.filasStock);
        
        console.log(pedido);
        return;
        const response = await this.pedidosService.create(pedido);
        console.log(response);
        if (response.fatal) {
          return this.notificacionesService.showError(response.fatal);
        }

        this.notificacionesService.showInfo("Se ha creado correctamente el usuario");
      } catch (error) {
        console.log(error);
        this.notificacionesService.showError("No se ha creado correctamente el usuario.");
      }
      return;
    }

    //Actualziar
    try{
      const pedido =  this.pedidoForm.value;
      
      const response = await this.pedidosService.update(pedido);
      if (response.fatal) {
        return this.notificacionesService.showError(response.fatal);
      }

      /*APSP: Una vez se actualize el pedido faltara actualizar los registros de 
        las tablas "pedidos_have_stocks" y "stocks". 
        2. Borrar las líneas de la tabla "pedidos_have_stocks" de la base de datos (digo 
          borrar porque si queremos actualizar,si se cambia el stock de la línea, 
          no lo encontrariamos y seria erroneo esto). Para hacerlo:
            2.1 Primero ir a buscar los stocks que tiene el array "this.oldFilasStock" 
                ya que este array tendra los datos antiguos antes de que se actualicen.
                (este campo se debe crear pero la idea es que se informara cuando se
                termine de crear el pedido haciendo copia del array this.filasStock,
                o bien cuando se cargue el pedido y se cargue el array this.filasStock
                con la base de datos, en este momento en el ngOnInit(), copiar wl array
                this.filasStock a este nueva) 
            2.2 Recorrer este array this.oldFilasStock" y:
                2.2.1 Ir a la tabla de stocks de la base de datos y actualizar para cada stock 
                  que encontremos con el mismo id "stocks.stocks_id" =  "this.oldFilasStock[x].stocks_id",
                  sumarle a "stocks.unidades" la cantidad del registro "this.oldFilasStock[x].unidades_utilizadas",
                  para que no perdamos el stock.
                2.2.2 borrar los registros de la tabla "pedidos_have_stocks" de la base de datos filtrando por:
                  "pedidos_have_stocks.pedidos_id" =  "this.oldFilasStock[x].pedidos_id" y
                  "pedidos_have_stocks.stocks_id" =  "this.oldFilasStock[x].stocks_id"
        3. Hacer el mismo ciclo que al crear->
           Buscar en la tabla stocks si las "unidades" son mayores al campo informado "this.filasStock[x].unidades_utilizadas" 
        4. Si se cumple esto, procedemos a crear un registro de la tabla "pedidos_have_stocks" con los campos:
              4.1 "pedidos_have_stocks.pedidos_id" =  "[response].pedidos_id"
              4.2 "pedidos_have_stocks.stocks_id" =  "this.filasStock[x].stocks_id"
              4.3 "pedidos_have_stocks.unidades_utilizadas" =  "this.filasStock[x].unidades_utilizadas"
      */

      this.notificacionesService.showInfo("Se ha actualizado correctamente el usuario");
    }catch(error){
      console.log(error);
      this.notificacionesService.showError("No se ha actualizado correctamente el pedido.");
    }
  }


  /* Cuando se incia el componente se verifica si es creación o no, si es actualización se informan campos del formulario */
  ngOnInit(): void {
  
      this.activatedRoute.params.subscribe(async (params:any) : Promise<void>=> {
        this.id = (params.id); 
        
        //Si esta creando un pedido entrara aqui
        if (!this.id) {
          this.isUpdate = false;
          this.buttonName = "Crear";
          return;
        }
        //Si esta editando un pedido entrara aqui
        this.isUpdate = true;
        this.buttonName = "Actualizar";
  
        // Activa los botones 'Editar' y 'Eliminar' 
        try {
          let response: any = await this.pedidosService.getById(this.id);
          if (response.fatal) {
            return this.notificacionesService.showError(response.fatal);
          }
          this.rellenarCamposForm(response);
        } catch(err) {
          console.log(err);
          this.notificacionesService.showError("No ha cargado correctamente el pedido");
        }
      }) 

      this.obtenerAlmacenes();
      this.obtenerCamiones();
  
  }

  /* Acción que rellena los campos del formulario */
  rellenarCamposForm(response : any) {
  
    const pedido: Pedido = response[0]; 
    console.log(pedido)
    this.pedidoForm = new FormGroup({
      pedidos_id: new FormControl(pedido.pedidos_id,[]),
      fecha_salida: new FormControl(pedido.fecha_salida, [
        Validators.required
      ]),
      fecha_llegada: new FormControl(pedido.fecha_llegada, [
        Validators.required
      ]),
      estado_pedido: new FormControl(pedido.estado_pedido, []),
      medida: new FormControl(pedido.medida, [
        Validators.required
      ]),
      fecha_creacion: new FormControl(pedido.fecha_creacion, []),
      usuarios_id_creador: new FormControl(pedido.usuarios_id_creador, []), 
      usuarios_id_revisador: new FormControl(pedido.usuarios_id_revisador, []),
      almacenes_id_origen: new FormControl(pedido.almacenes_id_origen, [
        Validators.required
      ]),
      almacenes_id_destion: new FormControl(pedido.almacenes_id_destion, [
        Validators.required
      ]),
      camiones_id: new FormControl(pedido.camiones_id, [
        Validators.required
      ]),
      usuario_id_aprobador: new FormControl(pedido.usuario_id_aprobador, []), 
      observaciones: new FormControl(pedido.observaciones, []),
    }, []);
  }


  // Obtención de los nombres de los almacenes para pintarlos en el html (almacen de origen / destino)
  async obtenerAlmacenes() : Promise<void>  {

    try {
      let response = await this.almacenesService.getAll();
      if (response.fatal) {
        return this.notificacionesService.showError(response.fatal);
      }
      this.almacenes = response;
      
    }catch(error){
      this.notificacionesService.showError("Algo ha ido mal al cargar la tabla");
      console.log(error)
    }
  }

  //Moficar usuarios_id_revisador y el listado de stocks para posiciones
  almacenOrigenChange(event : any) {
    const idAlmacenSelected = event.target.value;
    const findAlmacen : Almacen  = this.almacenes.find((element:Almacen) => element.almacenes_id == idAlmacenSelected);
    const encargadoRevisar = findAlmacen.usuarios_id_encargado;
    this.stocksOrigen = findAlmacen.stocks;
    this.pedidoForm.patchValue({
      usuarios_id_revisador: encargadoRevisar
    })
  }

  //Moficar usuario_id_aprobador y el listado de stocks para posiciones
  almacenDestinoChange(event : any) {
    const idAlmacenSelected = event.target.value;
    const findAlmacen : Almacen  = this.almacenes.find((element:Almacen) => element.almacenes_id == idAlmacenSelected);
    const encargadoAprobar = findAlmacen.usuarios_id_encargado;
    this.pedidoForm.patchValue({
      usuario_id_aprobador: encargadoAprobar
    })
  }

  // Obtención de los nombres de los camiones para pintarlos en el html
  async obtenerCamiones() : Promise<void>  {

    try {
      let response = await this.camionesService.getAll();
      if (response.fatal) {
        return this.notificacionesService.showError(response.fatal);
      }
      this.camiones = response;
      
    }catch(error){
      this.notificacionesService.showError("Algo ha ido mal, mira el error en consola");
      console.log(error)
    }
  }

  //APSP: Obtención de los stocks disponibles del almacén, para pintarlos en el html
  obtenerStocks(){
    
  }

  /* Cuando se le de al botón de cancelar*/
  cancelar(){
    this.router.navigate(['/pedidos']);
  }
 
  /* APSP -> Métodos para añadir/borrar una filas  y posateriormente en la acción "submitForm" 
    añadir estas filas en la tabla de la base de datos "pedidos_have_Stocks" */ 
  anadirFila() {
    const nuevaFila : PedidosHaveStock = { 
                        posicion: this.filasStock.length + 1,
                        stocks_id: 0,
                        descripcion_material: "",
                        descripcion_categoria: "",
                        unidades_utilizadas: 0,
                        unidades: 0 ,
                        materiales_id: 0
                      };
    this.filasStock.push(nuevaFila);
    
  }

  // Método para eliminar una fila de la tabla
  eliminarFila(fila: any) {
    const indice = this.filasStock.indexOf(fila);
    if (indice !== -1) {
      this.filasStock.splice(indice, 1);
      this.recalcularFilas();
    }
  }
  //Rellenar otros campos de la tabla filasStock
  informarFilaStock(ev : any, fila: PedidosHaveStock) {
    const idStock = ev.target.value;
    const stockAlmacenRecuperado = this.stocksOrigen.find((stockBuscar : StockAlmacen) => stockBuscar.stocks_id == idStock);
    const filaPedidosHaveStock = this.filasStock.find( (filaBuscar : PedidosHaveStock) => filaBuscar.posicion == fila.posicion);
    
    if (stockAlmacenRecuperado && stockAlmacenRecuperado.unidades && filaPedidosHaveStock) {
      filaPedidosHaveStock.descripcion_material =  stockAlmacenRecuperado.nombre_material;
      filaPedidosHaveStock.descripcion_categoria = stockAlmacenRecuperado.categorias_materiales_id + 
                                                  " - " + 
                                                  stockAlmacenRecuperado.descripcion_categoria;
      filaPedidosHaveStock.unidades = stockAlmacenRecuperado.unidades;
      filaPedidosHaveStock.materiales_id = stockAlmacenRecuperado.materiales_id;
    }
  }
  recalcularFilas() {
    this.filasStock = this.filasStock.map( (fila, indice) => {
      return {
        ...fila,
        posicion: indice + 1
      };
    });
  }

  //Para eviar el envío del formulario
  noAction(ev: KeyboardEvent) {
    if (ev.key == "Enter") {
      ev.preventDefault(); 
    }
  }



  /* APSP -> Métodos generales para el detalle */
  //Control de errores del form
  controlError(nombreCampo: string, tipoError: string): boolean {
    if (this.pedidoForm.get(nombreCampo)?.hasError(tipoError) && 
        this.pedidoForm.get(nombreCampo)?.touched) 
    {
      return true
    }
    return false
  }

  stocksFiltred = (filasStocks : any[]) => {
    filasStocks.forEach((stock) => {
      delete stock.descripcion_material;
      delete stock.descripcion_categoria;
      stock.unidades = stock.unidades_utilizadas;
      delete stock.unidades_utilizadas;

    });
    return filasStocks;
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
  
  
