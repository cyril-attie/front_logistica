import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Almacen } from 'src/app/interfaces/almacen';
import { StockAlmacen } from 'src/app/interfaces/stock-almacen';
import { StockMaterial } from 'src/app/interfaces/stock-material';
import { Usuario } from 'src/app/interfaces/usuario';
import { AlmacenService } from 'src/app/servicios/almacen.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { UsuariosServiceService } from 'src/app/servicios/usuarios-service.service';

@Component({
  selector: 'app-detalle-almacen-form',
  templateUrl: './detalle-almacen-form.component.html',
  styleUrls: ['./detalle-almacen-form.component.sass']
})
export class DetalleAlmacenFormComponent implements OnInit {


  almacenExiste: boolean = false; 
  almacenForm: FormGroup;
  id: number = 0;
  isUpdate : boolean = false;
  buttonName: string = '';
  encargados: Usuario | any = [];


  stocksOrigen: StockAlmacen[] = [];
  filasStock: StockMaterial[] = [];
  fila : StockMaterial | any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private almacenService: AlmacenService,
    private notificacionesService: NotificacionesService,
    private usuariosService: UsuariosServiceService,
    private router: Router
  ) {
    this.almacenForm = new FormGroup({
      almacenes_id: new FormControl('', []),
      nombre_almacen: new FormControl('', [Validators.required]),
      calle: new FormControl('', [Validators.required]),
      localidad: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required]),
      codigo_postal: new FormControl('', [Validators.required]),
      coordenadas: new FormControl('', [Validators.required]),
      capacidad_almacen: new FormControl('', [Validators.required]),
      usuarios_id_encargado: new FormControl('', [Validators.required])
    }, []);
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(async (params:any) : Promise<void> => {
      this.id = (params.id); 
      console.log(this.id)

       //Crear
       if (!this.id) {
        this.isUpdate = false;
        this.buttonName = "Crear";
        return;
      }
      //Editar
      this.isUpdate = true;
      this.buttonName = "Actualizar";

       // Activa los botones 'Editar' y 'Eliminar' 
       try {
        let response: any = await this.almacenService.getById(this.id);
        if (response.fatal) {
          return this.notificacionesService.showError(response.fatal);
        }
        this.rellenarCamposForm(response);
      } catch(err) {
        console.log(err);
        this.notificacionesService.showError("No ha cargado correctamente el almacen");
      }
    })  
  }


  // FUNCIÓN PARA RELLENAR EL FORMULARIO CON LOS DATOS CUANDO SE VAYA A ACTUALIZAR
  rellenarCamposForm (response : any) {
    const almacen: Almacen | any = response[0]; 
    console.log(almacen);
    this.almacenForm = new FormGroup({
      almacenes_id: new FormControl(almacen.almacenes_id, []),
      nombre_almacen: new FormControl(almacen.nombre_almacen, [Validators.required]),
      calle: new FormControl(almacen.calle, [Validators.required]),
      localidad: new FormControl(almacen.localidad, [Validators.required]),
      pais: new FormControl(almacen.pais, [Validators.required]),
      codigo_postal: new FormControl(almacen.codigo_postal, [Validators.required]),
      coordenadas: new FormControl(almacen.coordenadas, [Validators.required]),
      capacidad_almacen: new FormControl(almacen.capacidad_almacen, [Validators.required]),
      usuarios_id_encargado: new FormControl(almacen.usuarios_id_encargado, [Validators.required])
    }, []);
  }

     
  // FORMULARIO 
  async submitAlmacen(){
    //Crear
      if (!this.isUpdate){
        try { 
          const almacen =  this.almacenForm.value;
          const response = await this.almacenService.create(almacen);
          this.notificacionesService.showInfo("Se ha creado correctamente la categoría");
        } catch (error) {
          console.log(error);
          this.notificacionesService.showError("No se ha creado correctamente la categoría.");
        }
        return;
      }
      //Actualizar
      try{
        const almacen =  this.almacenForm.value;
          const response = await this.almacenService.create(almacen);
        this.notificacionesService.showInfo("Se ha actualizado correctamente la categoría");
      }catch(error){
        console.log(error);
        this.notificacionesService.showError("No se ha actualizado correctamente la categoría.");
      }
  }

      // BOTÓN ATRÁS
      cancelar(){
        this.router.navigate(['/almacenes']);
      }

      // CAMPOS OBLIGATORIOS
      controlError(nombreCampo: string, tipoError: string): boolean {
        if (this.almacenForm.get(nombreCampo)?.hasError(tipoError) && 
            this.almacenForm.get(nombreCampo)?.touched) 
        {
          return true
        }
        return false
      }

      // OBTENER LOS ENCARGADOS 
      Encargado() {

        const response = this.usuariosService.getAll(); 
        console.log(response)

        // const encargado = response[roles_id] === 3; 
        // const encargado = event.target.value;
     

        const findEncargado : Usuario  = this.encargados.find((element:any) => element.roles_id == 3);
        console.log(findEncargado)
      }


      // TABLA MATERIALES Y STOCK
      anadirFila(){
          const nuevaFila : StockMaterial = { 
                              posicion: this.filasStock.length + 1,
                              stocks_id: 0,
                              descripcion_material: "",
                              descripcion_categoria: "",
                              total_unidades: 0 ,
                              materiales_id: 0
                            };
          this.filasStock.push(nuevaFila);
          
        }


      // Método para eliminar una fila de la tabla
      eliminarFila(fila: any) {
        const indice = this.filasStock.indexOf(fila); // busca la primera aparicion de la fila que se le ha pasado por parámetro y se guarda en indice
        if (indice !== -1) {  // si ese indice es diferente de -1 se elimina con el splice esa posición
          this.filasStock.splice(indice, 1);
          this.recalcularFilas();
        }
      }

      recalcularFilas() {
        this.filasStock = this.filasStock.map( (fila, indice) => {
          return {
            ...fila, // se crea un nuevo objeto con haciendo un spread de fila
            posicion: indice + 1 // esto no lo pillo
          };
        });
      }

      noAction(ev: KeyboardEvent) {
        if (ev.key == "Enter") {
          ev.preventDefault(); // esto evita que se realice el comportamiento por defecto al presionar Enter
        }
      }

      //Rellenar otros campos de la tabla filasStock 

      informarFilaStock(ev : any, fila: StockMaterial) {
        const idStock = ev.target.value;
        console.log(idStock)

        const stockAlmacenRecuperado = this.stocksOrigen.find((stockBuscar : StockAlmacen) => stockBuscar.stocks_id == idStock);
        console.log(stockAlmacenRecuperado)

        const filaStockAlmacen = this.filasStock.find( (filaBuscar : StockMaterial) => filaBuscar.posicion == fila.posicion);
        console.log(filaStockAlmacen);

        if (stockAlmacenRecuperado && stockAlmacenRecuperado.unidades && filaStockAlmacen) {
          filaStockAlmacen.descripcion_material =  stockAlmacenRecuperado.nombre_material;
          filaStockAlmacen.descripcion_categoria = stockAlmacenRecuperado.categorias_materiales_id + 
                                                      " - " + 
                                                      stockAlmacenRecuperado.descripcion_categoria;
          filaStockAlmacen.total_unidades = stockAlmacenRecuperado.unidades;
          filaStockAlmacen.materiales_id = stockAlmacenRecuperado.materiales_id;
          console.log(filaStockAlmacen);

}
  }

}

      
    





    

 
