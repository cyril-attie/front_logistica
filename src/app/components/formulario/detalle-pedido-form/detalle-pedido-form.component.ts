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
  fila: PedidosHaveStock | any = {};
  estadoPedido: string = ''; 
  rol: number | any = 0;
  esEncargado: boolean = false;
  esOperario: boolean = false;
  enPreparacion: boolean = false; 
  enTransito: boolean = false; 
  entregado: boolean = false; 
  
  
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
      estado_pedido: new FormControl('En revisión', []),
      medida: new FormControl('', [
        Validators.required
      ]),
      fecha_creacion: new FormControl(actualDate, []), /*APSP: Se pone automaticamente con la fecha del dia de la creación del pedido */
      usuarios_id_creador: new FormControl(usuarioCreador, []), /*APSP: Se pone con el usuario que crea el pedido, es decir el operario */
      usuarios_id_revisador: new FormControl('', []), /*APSP: Se pone con el "usario_id_encargado" de la tabla almacenes del almacén detino*/
      almacenes_id_origen: new FormControl('', [
        Validators.required
      ]),
      almacenes_id_destino: new FormControl('', [
        Validators.required
      ]),
      camiones_id: new FormControl('', [
        Validators.required
      ]),
      usuarios_id_aprobador: new FormControl('', []), /*APSP: Se pone con el "usario_id_encargado" de la tabla almacenes del almacén origen*/
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
        
        //Formatemos fechas
        let fechaSalida= new Date(pedido.fecha_salida);
        let fechaLlegada= new Date(pedido.fecha_llegada);

        let fechaSalidaFormat =formatDate(fechaSalida,'yyyy-MM-dd hh:mm:ss','en');
        let fechaLlegadaFormat =formatDate(fechaLlegada,'yyyy-MM-dd hh:mm:ss','en');
        
        pedido.fecha_salida  =fechaSalidaFormat;
        pedido.fecha_llegada  =fechaLlegadaFormat;
      
        //Montamos stocks
        pedido.stocks = this.stocksFiltred(this.filasStock);
        console.log(pedido);  

        //Realizamos petición
        const response = await this.pedidosService.create(pedido);
        if (response.fatal) {
          return this.notificacionesService.showError(response.fatal);
        }
        this.notificacionesService.showInfo("Se ha creado correctamente el pedido " + response.insertId);
        this.router.navigate(['/pedido/' + response.insertId]);
        return;
      } catch (error) {
        console.log(error);
        return this.notificacionesService.showError("No se ha creado correctamente el pedido.");
      }
    }

    //Actualziar
    try{
      const pedido =  this.pedidoForm.value;
      delete pedido["pedidos_id"];

      //Formatemos fechas
      let fechaSalida= new Date(pedido.fecha_salida);
      let fechaLlegada= new Date(pedido.fecha_llegada);

      let fechaSalidaFormat =formatDate(fechaSalida,'yyyy-MM-dd hh:mm:ss','en');
      let fechaLlegadaFormat =formatDate(fechaLlegada,'yyyy-MM-dd hh:mm:ss','en');

      pedido.fecha_salida  =fechaSalidaFormat;
      pedido.fecha_llegada  =fechaLlegadaFormat;
      
      //Montamos stocks
      pedido.stocks = this.stocksFiltred(this.filasStock);
      console.log(pedido);  

      //Realizamos petición
      const response = await this.pedidosService.update(pedido,this.id);
      console.log(response);  
      if (response.fatal) {
        return this.notificacionesService.showError(response.fatal);
      }
      this.notificacionesService.showInfo("Se ha actualizado correctamente el pedido");
    }catch(error){
      console.log(error);
      this.notificacionesService.showError("No se ha actualizado correctamente el pedido.");
    }
   
  }


  /* Cuando se incia el componente se verifica si es creación o no, si es actualización se informan campos del formulario */
  async ngOnInit(): Promise<void> {

      await this.obtenerAlmacenes();
      await this.obtenerCamiones();
  
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
        this.rol = localStorage.getItem('rol_almacen');
        console.log(this.rol)
        
        // if (estado esta en preparacion){
        //   this.enPreparacion = true; 
        // }

        if (this.rol === '3'){
          this.esEncargado = true; 
        } else if(this.rol === '4'){
          this.esOperario = true; 
        }

        
        try {
          let response: any = await this.pedidosService.getById(this.id);
          let estadoActual = response.estado_pedido
          console.log(estadoActual)
          if(estadoActual === 'En preparación'){
            this.enPreparacion = true; 
          } else if (estadoActual === 'En tránsito'){
            this.enTransito = true; 
          } else if (estadoActual === 'Entregado' ) {
            this.entregado = true; 
          }else if (response.fatal){
            return this.notificacionesService.showError(response.fatal);
          }
          console.log(response)
      
          this.rellenarCamposForm(response);
        } catch(err) {
          console.log(err);
          this.notificacionesService.showError("No ha cargado correctamente el pedido");
        }
      }) 

      
  }

  /* Acción que rellena los campos del formulario */
  rellenarCamposForm (response : any) {
  
    const pedido: Pedido = response; 

    //Convertimos las fechas
    const fechaCreacion = new Date(pedido.fecha_creacion);
    const fechaCreacionFormat = formatDate(new Date(),'yyyy-MM-dd hh:mm:ss','en');
    
    const fechaSalida = new Date(pedido.fecha_salida);
    const fechaSalidaFormat = formatDate(new Date(),'yyyy-MM-dd hh:mm:ss','en');

    const fechaLlegada = new Date(pedido.fecha_salida);
    const fechaLlegadaFormat = formatDate(new Date(),'yyyy-MM-dd hh:mm:ss','en');

   
    //Rellenamos form
    this.pedidoForm = new FormGroup({
      pedidos_id: new FormControl(pedido.pedidos_id,[]),
      fecha_salida: new FormControl(fechaSalidaFormat, [
        Validators.required
      ]),
      fecha_llegada: new FormControl(fechaLlegadaFormat, [
        Validators.required
      ]),
      estado_pedido: new FormControl(pedido.estado_pedido, []),
      medida: new FormControl(pedido.medida, [
        Validators.required
      ]),
      fecha_creacion: new FormControl(fechaCreacionFormat, []),
      usuarios_id_creador: new FormControl(pedido.usuarios_id_creador, []), 
      usuarios_id_revisador: new FormControl(pedido.usuarios_id_revisador, []),
      almacenes_id_origen: new FormControl(pedido.almacenes_id_origen, [
        Validators.required
      ]),
      almacenes_id_destino: new FormControl(pedido.almacenes_id_destino, [
        Validators.required
      ]),
      camiones_id: new FormControl(pedido.camiones_id, [
        Validators.required
      ]),
      usuarios_id_aprobador: new FormControl(pedido.usuarios_id_aprobador, []), 
      observaciones: new FormControl(pedido.observaciones, []),
    }, []);
    
    //Informamos stocksOrgien para que se pueda recuperar en cada línea de pedidos_have_stock
    const findAlmacen : Almacen  = this.almacenes.find((element:Almacen) => element.almacenes_id == pedido.almacenes_id_origen);
    this.stocksOrigen = findAlmacen.stocks;
    
    //Rellenamos tabla pedidos_have_Stock
    const stocks = pedido.stocks;
    if (stocks) {
      
      stocks.forEach(stock => {
        let newFila : PedidosHaveStock = {
          unidades_utilizadas: stock.unidades_utilizadas,
          posicion: stock.posicion,
          stocks_id: stock.stocks_id,
          unidades: 0,
          materiales_id: 0,
          descripcion_material: "",
          descripcion_categoria: ""
        }
        
        const stockAlmacenRecuperado = this.stocksOrigen.find((stockBuscar : StockAlmacen) => stockBuscar.stocks_id == stock.stocks_id);
        
        if (stockAlmacenRecuperado && stockAlmacenRecuperado.unidades) {
          newFila.descripcion_material =  stockAlmacenRecuperado.nombre_material;
          newFila.descripcion_categoria = stockAlmacenRecuperado.categorias_materiales_id + 
                                          " - " + 
                                          stockAlmacenRecuperado.descripcion_categoria;
          newFila.unidades = stockAlmacenRecuperado.unidades;
          newFila.materiales_id = stockAlmacenRecuperado.materiales_id;
        }
        this.filasStock.push(newFila);
      });
    }
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
    console.log(idAlmacenSelected)
    
    const findAlmacen : Almacen  = this.almacenes.find((element:Almacen) => element.almacenes_id == idAlmacenSelected);
    console.log(findAlmacen)

    const encargadoRevisar = findAlmacen.usuarios_id_encargado;
    console.log(encargadoRevisar);

    this.stocksOrigen = findAlmacen.stocks;
    this.pedidoForm.patchValue({
      usuarios_id_revisador: encargadoRevisar
    })
  }

  //Moficar usuarios_id_aprobador y el listado de stocks para posiciones
  almacenDestinoChange(event : any) {
    const idAlmacenSelected = event.target.value;
    const findAlmacen : Almacen  = this.almacenes.find((element:Almacen) => element.almacenes_id == idAlmacenSelected);
    const encargadoAprobar = findAlmacen.usuarios_id_encargado;
    this.pedidoForm.patchValue({
      usuarios_id_aprobador: encargadoAprobar
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
      filaPedidosHaveStock.stocks_id = idStock;
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

  //Método para enviar los stocks en la response (quitamos campos inecesarios de tabla)
  stocksFiltred = (filasStocks : any[]) => {
    const fliasStock2 = filasStocks.map((stock : any) => ({ ...stock }));
    fliasStock2.forEach((stock) => {
      delete stock.descripcion_material;
      delete stock.descripcion_categoria;
      stock.unidades = stock.unidades_utilizadas;
      delete stock.unidades_utilizadas;

    });
    return fliasStock2;
  } 


  // BOTONES ENCARGADO 
  revisarPedido() {
    const preparacion = 'En preparación';
    if (this.id){
      try {
        this.pedidosService.update({ estado_pedido: preparacion }, this.id)
          .then((pedido) => {
            console.log('Pedido actualizado:', pedido);
            this.notificacionesService.showInfo("El pedido ha pasado a estar en preparación");
            // this.router.navigate(['/pedidos']);
          });
      } catch (error) {
        console.error('Error al actualizar el pedido:', error);
      }
    }
  }
  
  cancelarPedido() {
    const cancelado = 'Cancelado';
    if (this.id){
      try {
        this.pedidosService.update({ estado_pedido: cancelado }, this.id)
          .then((pedido) => {
            console.log('Pedido actualizado:', pedido);
            this.notificacionesService.showInfo("El pedido ha sido cancelado");
            // this.router.navigate(['/pedidos']);
          });
      } catch (error) {
        console.error('Error al actualizar el pedido:', error);
      }
    }
  }

  aprobarPedido(){
    const aprobado = 'Aprobado';
    if (this.id){
      try {
        this.pedidosService.update({ estado_pedido: aprobado }, this.id)
          .then((pedido) => {
            console.log('Pedido actualizado:', pedido);
            this.pedidoForm = new FormGroup({
              estado_pedido: new FormControl(pedido.estado_pedido,[])});
            this.notificacionesService.showInfo("El pedido ha sido aprobado");
            // this.router.navigate(['/pedidos']);
          });
      } catch (error) {
        console.error('Error al actualizar el pedido:', error);
      }
    }
  }

  rechazarPedido(){
    const rechazado = 'Rechazado';
    if (this.id){
      try {
        this.pedidosService.update({ estado_pedido: rechazado }, this.id)
          .then((pedido) => {
            console.log('Pedido actualizado:', pedido);
            this.notificacionesService.showInfo("El pedido ha sido rechazado");
            // this.router.navigate(['/pedidos']);
          });
      } catch (error) {
        console.error('Error al actualizar el pedido:', error);
      }
    }
  }

  // BOTONES OPERARIO 

  transito(){
    const transito = 'En tránsito';
    if (this.id){
      try {
        this.pedidosService.update({ estado_pedido: transito }, this.id)
          .then((pedido) => {
            console.log('Pedido actualizado:', pedido);
            this.notificacionesService.showInfo("El pedido ha sido marcado como en tránsito");
            // this.router.navigate(['/pedidos']);
          });
      } catch (error) {
        console.error('Error al actualizar el pedido:', error);
      }
    }
  }

  entregarPedido(){
    const entregado = 'Entregado';
    if (this.id){
      try {
        this.pedidosService.update({ estado_pedido: entregado }, this.id)
          .then((pedido) => {
            console.log('Pedido actualizado:', pedido);
            this.notificacionesService.showInfo("El pedido ha sido entregado");
            // this.router.navigate(['/pedidos']);
          });
      } catch (error) {
        console.error('Error al actualizar el pedido:', error);
      }
    }
  }

  }


 
  
  
