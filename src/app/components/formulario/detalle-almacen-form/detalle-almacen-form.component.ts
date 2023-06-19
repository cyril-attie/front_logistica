import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Almacen } from 'src/app/interfaces/almacen';
import { Material } from 'src/app/interfaces/material';
import { StockAlmacen } from 'src/app/interfaces/stock-almacen';
import { StockMaterial } from 'src/app/interfaces/stock-material';
import { Usuario } from 'src/app/interfaces/usuario';
import { AlmacenService } from 'src/app/servicios/almacen.service';
import { MaterialService } from 'src/app/servicios/material.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { StockService } from 'src/app/servicios/stock.service';
import { UsuariosServiceService } from 'src/app/servicios/usuarios-service.service';
import Swal from 'sweetalert2';

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


  materialesRecuperados: Material[] = [];
  filasStock: StockMaterial[] = [];
  fila : StockMaterial | any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private almacenService: AlmacenService,
    private notificacionesService: NotificacionesService,
    private usuariosService: UsuariosServiceService,
    private materialesService : MaterialService,
    private stocksService : StockService,
    private router: Router
  ) {
    this.almacenForm = new FormGroup({
      almacenes_id: new FormControl('', []),
      nombre_almacen: new FormControl('', [Validators.required]),
      calle: new FormControl('', [Validators.required]),
      codigo_postal: new FormControl('', [Validators.required]),
      localidad: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required]),
      x: new FormControl('', [Validators.required]),
      y: new FormControl('', [Validators.required]),
      capacidad_almacen: new FormControl('', [Validators.required]),
      usuarios_id_encargado: new FormControl('', [Validators.required])
    }, []);
  }

  async ngOnInit(): Promise<void> {

    await this.obtenerEncargados();
    await this.obtenerMateriales();

    this.activatedRoute.params.subscribe(async (params:any) : Promise<void> => {
      this.id = (params.id); 

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
    const almacen: | any = response; 
    this.almacenForm = new FormGroup({
      almacenes_id: new FormControl(almacen.almacenes_id, []),
      nombre_almacen: new FormControl(almacen.nombre_almacen, [Validators.required]),
      calle: new FormControl(almacen.calle, [Validators.required]),
      codigo_postal: new FormControl(almacen.codigo_postal, [Validators.required]),
      localidad: new FormControl(almacen.localidad, [Validators.required]),
      pais: new FormControl(almacen.pais, [Validators.required]),
      x: new FormControl(almacen.coordenadas.x, [Validators.required]),
      y: new FormControl(almacen.coordenadas.y, [Validators.required]),
      capacidad_almacen: new FormControl(almacen.capacidad_almacen, [Validators.required]),
      usuarios_id_encargado: new FormControl(almacen.usuarios_id_encargado, [Validators.required])
    }, []);

     
     //Rellenamos tabla pedidos_have_Stock
     const stocks = almacen.stocks;
     if (stocks) {
       stocks.sort((a : any, b : any) => a.posicion - b.posicion);
       stocks.forEach((stock :any) => {
         let newFila : StockMaterial = {
            posicion: stock.posicion,
            stocks_id: stock.stocks_id,
            nombre_material: stock.nombre_material,
            descripcion_categoria: stock.descripcion_categoria,
            unidades: stock.unidades,
            materiales_id: stock.materiales_id
         }
         this.filasStock.push(newFila);
       });

     }

  }

     
  // FORMULARIO 
  async submitAlmacen(){
    try { 
      const almacen =  this.almacenForm.value;
      almacen.coordenadas = {
        x:almacen.x,
        y:almacen.y
      }
      delete almacen["almacenes_id"];
      delete almacen["x"];
      delete almacen["y"];

      //Montamos stocks
      almacen.stocks = this.almacenesFiltred(this.filasStock);

      //Si creamos
      if (!this.isUpdate) {
        const response = await this.almacenService.create(almacen);
        if (response.fatal) {
          return this.notificacionesService.showError(response.fatal);
        }
        this.notificacionesService.showInfo("Se ha creado correctamente el almacén " + response.insertId);
        this.router.navigate(['/almacen/' + response.insertId]);
      //Si actualizamos
      } else {
        const response = await this.almacenService.update(almacen,this.id);
        if (response.fatal) {
          return this.notificacionesService.showError(response.fatal);
        }
        this.notificacionesService.showInfo("Se ha actualizado correctamente el almacén " + this.id);
        this.router.navigate(['/almacen/' + this.id]);
      }
      return;
    } catch (error) {
      console.log(error);
      return this.notificacionesService.showError("No se ha creado correctamente el almacen.");
    }
  }
      
      

  // OBTENER LOS ENCARGADOS 
  async obtenerMateriales() {

    try {
      let response = await this.materialesService.getAll();
      if (response.fatal) {
        return this.notificacionesService.showError(response.fatal);
      }
      this.materialesRecuperados = response;
      
    }catch(error){
      this.notificacionesService.showError("Algo ha ido mal, mira el error en consola");
      console.log(error)
    }
  }

  // OBTENER LOS ENCARGADOS 
  async obtenerEncargados() {

    try {
      let response = await this.usuariosService.getAll();
      if (response.fatal) {
        return this.notificacionesService.showError(response.fatal);
      }
      const encargadosArray: any = response.filter((usuario: Usuario | any) => {
        return usuario.roles_id == 3;
      });
      this.encargados = encargadosArray;
      
    }catch(error){
      this.notificacionesService.showError("Algo ha ido mal, mira el error en consola");
      console.log(error)
    }
  }

  // BOTÓN ATRÁS
  cancelar(){
    this.router.navigate(['/almacenes']);
  }

  // TABLA MATERIALES Y STOCK
  anadirFila(){
      const nuevaFila : StockMaterial = { 
                          posicion: this.filasStock.length + 1,
                          stocks_id: 0,
                          nombre_material: "",
                          descripcion_categoria: "",
                          unidades: 0 ,
                          materiales_id: 0
                        };
      this.filasStock.push(nuevaFila);
      
    }


  

  //Rellenar otros campos de la tabla filasStock 
  informarFilaStock(ev : any, fila: StockMaterial) {
    const idMaterial = ev.target.value;
    const materialRecuperado = this.materialesRecuperados.find((materialBuscar : Material) => materialBuscar.materiales_id == idMaterial);
    const filaStockMaterial= this.filasStock.find( (filaBuscar : StockMaterial) => filaBuscar.posicion == fila.posicion);

    if (materialRecuperado && materialRecuperado.materiales_id && filaStockMaterial) {
      filaStockMaterial.nombre_material =  materialRecuperado.nombre;
      filaStockMaterial.descripcion_categoria = materialRecuperado.categorias_materiales_id + 
                                                  " - " + 
                                                  materialRecuperado.descripcion_categoria;
      filaStockMaterial.materiales_id = materialRecuperado.materiales_id;

    }
  }
  
  //Para eviar el envío del formulario
  noAction(ev: KeyboardEvent) {
    if (ev.key == "Enter") {
      ev.preventDefault(); // esto evita que se realice el comportamiento por defecto al presionar Enter
    }
  }
  
  /* APSP -> Métodos generales para el detalle */
  // CAMPOS OBLIGATORIOS
  controlError(nombreCampo: string, tipoError: string): boolean {
    if (this.almacenForm.get(nombreCampo)?.hasError(tipoError) && 
        this.almacenForm.get(nombreCampo)?.touched) 
    {
      return true
    }
    return false
  }

  //Método para enviar los stocks en la response (quitamos campos inecesarios de tabla)
  almacenesFiltred = (filasStocks : any[]) => {
    const fliasStock2 = filasStocks.map((stock : any) => ({ ...stock }));
    fliasStock2.forEach((stock) => {
      delete stock.stocks_id;
      delete stock.nombre_material;
      delete stock.descripcion_categoria;
    });
    return fliasStock2;
  } 
  
  /*Para la modal *************************/
  // Método para eliminar una fila de la tabla
  async eliminarFila(fila: StockMaterial | any): Promise<any> {

    // Cuando se esté creando no lanzaremos modal
    if (!this.isUpdate) {
      const indice = this.filasStock.indexOf(fila);
      if (indice !== -1) {
        this.filasStock.splice(indice, 1);
        this.recalcularFilas();
      }
      return;
    }
  
    // Cuando se elimine de un almacén que ya existe
    const result = await Swal.fire({
      title: 'Deseas borrar el stock ' + fila.stocks_id + ' ?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    });
  
    if (result.value) {
      try {

        //Borramos stock de la base de datos
        const response = await this.stocksService.delete(fila.stocks_id);
        if (!response) {
          this.notificacionesService.showError("Algo ha ido mal");
          return;
        }
        if (response.fatal) {
          this.notificacionesService.showError(response.fatal);
          return;
        }

        const indice = this.filasStock.indexOf(fila);
        if (indice !== -1) {
          debugger;
          this.filasStock.splice(indice, 1);

          //Reordenamos posiciones de los stocks
          await this.recalcularFilas();

          //Actualizamos unicamente posiciones nuevas de los stocks
          this.filasStock.forEach(async fila => {
            const stockUpdate = {
              posicion: fila.posicion
            }
            const response = await this.stocksService.update(stockUpdate,fila.stocks_id);
            console.log(response);
          });
        }
  
        Swal.fire(
          'Borrado!',
          'Se ha borrado el stock ' + fila.stocks_id + ' correctamente.',
          'success'
        );
      } catch (err) {
        this.notificacionesService.showError("Algo ha ido mal");
        console.log(err);
      }
    }
  }

  recalcularFilas() {
    debugger;
    this.filasStock = this.filasStock.map( (fila, indice) => {
      return {
        ...fila, // se crea un nuevo objeto con haciendo un spread de fila
        posicion: indice + 1 // esto no lo pillo
      };
    });
    console.log(this.filasStock)
  }   

}

      
    





    

 
