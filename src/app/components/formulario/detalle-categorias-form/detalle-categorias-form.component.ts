import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/categoria';
import { CategoriasMaterialesService } from 'src/app/servicios/categorias-materiales.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';

@Component({
  selector: 'app-detalle-categorias-form',
  templateUrl: './detalle-categorias-form.component.html',
  styleUrls: ['./detalle-categorias-form.component.sass']
})
export class DetalleCategoriasFormComponent {

  categoriaForm: FormGroup; 
  isUpdate : boolean = false;
  id: number = 0;
  buttonName: string = '';

  constructor(
    private categoriasServices: CategoriasMaterialesService,
    private activatedRoute: ActivatedRoute,
    private notificacionesService: NotificacionesService,
    private router: Router
  ){
    this.categoriaForm = new FormGroup ({
      categorias_materiales_id: new FormControl('', []), 
      descripcion: new FormControl('', [Validators.required]), 
      comentario: new FormControl('', [Validators.required])
    }, []);

  }


  ngOnInit(): void {
  
    this.activatedRoute.params.subscribe(async (params:any) : Promise<void>=> {
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
        let response: any = await this.categoriasServices.getById(this.id);
        if (response.fatal) {
          return this.notificacionesService.showError(response.fatal);
        }
        this.rellenarCamposForm(response);
      } catch(err) {
        console.log(err);
        this.notificacionesService.showError("No ha cargado correctamente el material");
      }
    })  
  }

  rellenarCamposForm(response : any) {
  
    const categoria: Categoria = response[0]; 
    console.log(categoria);
    this.categoriaForm = new FormGroup({
      categorias_materiales_id: new FormControl(categoria.categorias_materiales_id,[]),
      descripcion: new FormControl(categoria.descripcion,[Validators.required]),
      comentario: new FormControl(categoria.comentario,[Validators.required]),
  
    }, []);
  }



  async submitCategoria() {
    
    //Crear
    if (!this.isUpdate){
      try { 
        const categoria =  this.categoriaForm.value;
        const response = await this.categoriasServices.create(categoria);
        this.notificacionesService.showInfo("Se ha creado correctamente la categoría");
      } catch (error) {
        console.log(error);
        this.notificacionesService.showError("No se ha creado correctamente la categoría.");
      }
      return;
    }
  
    //Actualizar
    try{
      const categoria =  this.categoriaForm.value;
      delete categoria["categorias_materiales_id"];
      const response = await this.categoriasServices.update(categoria, this.id);
      console.log(response)
      this.notificacionesService.showInfo("Se ha actualizado correctamente la categoría");
    }catch(error){
      console.log(error);
      this.notificacionesService.showError("No se ha actualizado correctamente la categoría.");
    }
  }

  cancelar(){
    this.router.navigate(['/categorias']); 
  }

  controlError(nombreCampo: string, tipoError: string): boolean {
    if (this.categoriaForm.get(nombreCampo)?.hasError(tipoError) && 
        this.categoriaForm.get(nombreCampo)?.touched) 
    {
      return true
    }
    return false
  }
}
