import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Camion } from 'src/app/interfaces/camion';
import { CamionesService } from 'src/app/servicios/camiones.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';

@Component({
  selector: 'app-detalle-camion-form',
  templateUrl: './detalle-camion-form.component.html',
  styleUrls: ['./detalle-camion-form.component.sass']
})
export class DetalleCamionFormComponent {

 
  camionForm: FormGroup;
  camionExiste: boolean = false; 
  title: string = 'Registrar';
  id: number = 0;
  isUpdate : boolean = false;
  buttonName: string = '';

  

  constructor(
    private camionService: CamionesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificacionesService: NotificacionesService
    ){
        this.camionForm = new FormGroup({
          camiones_id: new FormControl('', []),
          matricula_camion: new FormControl('', [Validators.required]),
          capacidad_maxima: new FormControl('', [Validators.required]),
          estado: new FormControl('', [Validators.required]),
        }, []);
      }



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params:any)=> {
      this.id = (params.id); 
      if (!this.id) {
        this.isUpdate = false;
        this.buttonName = "Crear";
        return;
      } 
       this.isUpdate = true;
       this.buttonName = "Actualizar";
       try {
        let response: any = await this.camionService.getById(this.id);
        if (response.fatal) {
          return this.notificacionesService.showError(response.fatal);
        }
        this.rellenarCamposForm(response);
      } catch(err) {
        console.log(err);
        this.notificacionesService.showError("No ha cargado correctamente el camión");
      };
      }
  )}


  // Rellena los campos si quiere actualizar el camión
  rellenarCamposForm(response : any) {
    const camion: Camion = response[0]; 
    console.log(camion);
    this.camionForm.patchValue({
      camiones_id: camion.camiones_id,
      matricula_camion: camion.matricula_camion,
      capacidad_maxima: camion.capacidad_maxima,
      estado: camion.estado
    });
    // this.camionForm = new FormGroup({
    //   camiones_id: new FormControl(camion.camiones_id,[]),
    //   matricula_camion: new FormControl(camion.matricula_camion,[Validators.required]),
    //   capacidad_maxima: new FormControl(camion.capacidad_maxima,[Validators.required]),
    //   estado: new FormControl(camion.estado,[Validators.required]),
    // }, []);
  }


  
  async submitCamion(){
    //Creamos un nuevo camión
    if (!this.isUpdate){
      try{
        const camion = this.camionForm.value;
        const response = this.camionService.create(camion);
      }catch(error){
        console.log(error);
        return alert('No has rellenado los datos del camión correctamente')
      }
    }
    // Se actualiza el camión
    try{
      const camion =  this.camionForm.value;
      delete camion["camiones_id"];
      console.log(camion)
      const response = await this.camionService.update(camion, this.id);
      console.log(response)
    
      this.notificacionesService.showInfo("Se ha actualizado correctamente el usuario");
    }catch(error){
      console.log(error);
      this.notificacionesService.showError('No se ha actualizado correctamente el usuario.');
    }
  };



  // Botón "Cancelar"
  cancelar(){
    this.router.navigate(['/camiones']);
  }



  // Control de errores en formulario
  controlError(nombreCampo: string, tipoError: string): boolean {
    if (this.camionForm.get(nombreCampo)?.hasError(tipoError) && 
        this.camionForm.get(nombreCampo)?.touched) 
    {
      return true
    }
    return false
  }
}
