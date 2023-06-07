import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Camion } from 'src/app/interfaces/camion';
import { CamionesService } from 'src/app/servicios/camiones.service';

@Component({
  selector: 'app-detalle-camion-form',
  templateUrl: './detalle-camion-form.component.html',
  styleUrls: ['./detalle-camion-form.component.sass']
})
export class DetalleCamionFormComponent {

 
  camionForm: FormGroup;
  camionExiste: boolean = false; 
  title: string = "Registrar";
  id: number = 0;

  constructor(
    private camionService: CamionesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){

    this.camionForm = new FormGroup({
      matricula: new FormControl('', [Validators.required]),
      capacidad: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
    }, []);

  }




  // Botón "Crear un nuevo camión"
   datosCamion(){
    try{
      const camion = this.camionForm.value;
      const response = this.camionService.create(camion);

    }catch(error){
      console.log(error);
      return alert('No has rellenado los datos del camión correctamente')
    }

  };


  // Botón "Editar camión"
   async actualizar(){
    try{
      const camion =  this.camionForm.value;
      const response = await this.camionService.update(camion);
    }catch(error){
      console.log(error)
      return alert('No has actualizado los datos correctamente');
    }

  }

  // Botón "Cancelar"
  cancelar(){
    this.router.navigate(['/camiones']);
  }


  // Botón "Eliminar"
  eliminar(){
    try {
      const camion = this.camionForm.value;
      const response = this.camionService.delete(camion);
      alert("Has eliminado este camión");
      this.router.navigate(['/camiones']);

    }catch(error){
      console.log(error);
      return alert ('No has eliminado bien el camión')
    }

  }


   /**
  ** EL CAMIÓN SÍ EXISTE --> CAMPOS RELLENADOS
  **/  
  ngOnInit(): void {

    this.activatedRoute.params.subscribe(async (params:any)=> {
      this.id = (params.id); 
      if (this.id) {
  
        //El título cambia a 'Actualizar'
        this.title = 'Actualizar';
  
        // Activa los botones 'Editar usuario' y 'Eliminar' 
        this.camionExiste = true; 
        let response: any = await this.camionService.getById(this.id);
        const camion: Camion = response; 
  
        // Los campos del formulario aparecen rellenados
        this.camionForm = new FormGroup({
          matricula: new FormControl(camion.matricula, [Validators.required]),
          capacidad: new FormControl(camion.capacidad, [Validators.required]),
          estado: new FormControl(camion.estado, [Validators.required])
        }, []);
      }
    }
  )}
  }
