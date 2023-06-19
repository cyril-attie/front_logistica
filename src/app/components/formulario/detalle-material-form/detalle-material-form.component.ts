import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/categoria';
import { Material } from 'src/app/interfaces/material';
import { CategoriasMaterialesService } from 'src/app/servicios/categorias-materiales.service';
import { MaterialService } from 'src/app/servicios/material.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';

@Component({
  selector: 'app-detalle-material-form',
  templateUrl: './detalle-material-form.component.html',
  styleUrls: ['./detalle-material-form.component.sass']
})
export class DetalleMaterialFormComponent implements OnInit {

  materialForm: FormGroup;
  isUpdate : boolean = false;
  id: number = 0;
  buttonName: string = '';
  Categorias: any[] = [];
  nombresCategorias: string[] = [];

  constructor(
    private materialesServices: MaterialService,
    private activatedRoute: ActivatedRoute,
    private notificacionesService: NotificacionesService,
    private categoriasService: CategoriasMaterialesService,
    private router: Router
    ) {
    this.materialForm = new FormGroup({
      materiales_id: new FormControl('', []), // Se rellena solo en cuanto se quiere crear un nuevo material 
      nombre: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      categorias_materiales_id: new FormControl('', [Validators.required]),
      peso: new FormControl('', [Validators.required]),
      // stock: new FormControl('', [Validators.required]),
      descripcion_material: new FormControl('', [Validators.required]),
    }, []);
  }

  ngOnInit(): void {
  
    this.activatedRoute.params.subscribe(async (params:any) : Promise<void>=> {
      this.id = (params.id); 
      console.log(this.id)
      
      //Si esta creando un nuevo material entrara aqui
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
        let response: any = await this.materialesServices.getById(this.id);
        if (response.fatal) {
          return this.notificacionesService.showError(response.fatal);
        }
        this.rellenarCamposForm(response);
      } catch(err) {
        console.log(err);
        this.notificacionesService.showError("No ha cargado correctamente el material");
      }
    })

    this.getAllCategorias();
}

rellenarCamposForm(response : any) {
  
  const material: Material = response[0]; 
  console.log(material);
  this.materialForm = new FormGroup({
  materiales_id: new FormControl(material.materiales_id,[Validators.required]),
  nombre: new FormControl(material.nombre,[Validators.required]),
  estado: new FormControl(material.estado,[Validators.required]),
  categorias_materiales_id: new FormControl(material.categorias_materiales_id,[Validators.required]),
  peso: new FormControl(material.peso,[Validators.required]),
  descripcion_material: new FormControl(material.descripcion_material,[Validators.required]),
  
  
 
  }, []);
}

async submitMaterial() {
    
  //Crear
  if (!this.isUpdate){
    try { 
      const material =  this.materialForm.value;
      const response = await this.materialesServices.create(material);
      console.log(response)
      this.notificacionesService.showInfo("Se ha creado correctamente el material");
    } catch (error) {
      console.log(error);
      this.notificacionesService.showError("No se ha creado correctamente el material.");
    }
    return;
  }

  //Actualizar
  try{
    const material =  this.materialForm.value;
    delete material["materiales_id"]; 
    const response = await this.materialesServices.update(material, this.id);
    console.log(response)
    this.notificacionesService.showInfo("Se ha actualizado correctamente el material");
  }catch(error){
    console.log(error);
    this.notificacionesService.showError("No se ha actualizado correctamente el material.");
  }
}
  cancelar(){
    this.router.navigate(['/materiales']);
  }

  controlError(nombreCampo: string, tipoError: string): boolean {
    if (this.materialForm.get(nombreCampo)?.hasError(tipoError) && 
        this.materialForm.get(nombreCampo)?.touched) 
    {
      return true
    }
    return false
  } 


  async getAllCategorias() {
    try {
        const data: any = await this.categoriasService.getAll();        
        this.Categorias = data;
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
    }
}


}

 
  

