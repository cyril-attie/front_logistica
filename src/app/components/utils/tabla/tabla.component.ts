import { Component, Input } from '@angular/core';
import { PropiedadesTabla } from 'src/app/interfaces/propiedades-tabla';
import { UsuariosServiceService } from 'src/app/servicios/usuarios-service.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.sass']
})
export class TablaComponent {
  tablaColumnas: any[] = [];
  tablaValores: any[] = [];
  tablaClaves: any[] = [];

  //Recogemos información para pintar la tabla
  @Input() propiedadesTabla : PropiedadesTabla = {
    columnas: [],
    response: [],
    claves: []
  };

  constructor(private userService: UsuariosServiceService){}
  

  //Esta definido el ngDoCheck porque en el ngOnInit la propiedad Input
  //aún no se habia informado - APSP
  ngDoCheck(): void {
    if (this.tablaColumnas.length <= 0) {

      console.log(this.propiedadesTabla);
      //Informamos columnas de la tabla y las claves(estas no se utilizan en el html)
      this.tablaColumnas = this.propiedadesTabla.columnas;
      this.tablaClaves = this.propiedadesTabla.claves;
      
      //Filtramos la response con las claves de la propiedad "this.tablaClaves" 
      const responseFiltrada = this.propiedadesTabla.response.map((item : any) => {
        const nuevoObjeto : any= {};
        this.tablaClaves.forEach((propiedad) => {
          nuevoObjeto[propiedad] = item[propiedad];
        });
        return nuevoObjeto;
      });

      //Una vez filtrada procedemos a ordenar las propiedades segun el orden de las claves que hemos establecido
      //de esta forma labels, valores y claves seran array y todos en el mismo orden -APSP
      this.tablaValores = responseFiltrada.map((objeto) => {
        const propiedadesOrdenadas = Object.entries(objeto).sort((a, b) => {
          const indexA = this.tablaClaves.indexOf(a[0]);
          const indexB = this.tablaClaves.indexOf(b[0]);
      
          return indexA - indexB;
        });
        return propiedadesOrdenadas.map(([, valor]) => valor);
      });

    }

  }
}
