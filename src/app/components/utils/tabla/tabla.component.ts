import { Component, Input } from '@angular/core';
import { PropiedadesTabla } from 'src/app/interfaces/propiedades-tabla';
import { PedidosService } from 'src/app/servicios/pedidos.service';
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
    claves: [],
    botones: {
      ver : false,
      editar : false,
      borrar: false,
    },
    url_param: ""
  };
  //Campo para refrescar la tabla
  @Input() isUpdated : boolean = false;
  oldIsUpdated : boolean = false;

  pedidos: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPedidos: number = 0;
  totalPaginas: number = 0;

  constructor(
    private userService: UsuariosServiceService, 
    private pedidosService: PedidosService
    ){}     

  //Esta definido el ngDoCheck porque en el ngOnInit la propiedad Input
  //aún no se habia informado - APSP
   ngDoCheck(): void {

    //Cuando el campo del padre isUpdate se actualize por el suscribe, entrara en el código
    if (this.isUpdated != this.oldIsUpdated) {

      //Actualizamos campo oldIsUpdated para terminar el flujo
      this.oldIsUpdated = this.isUpdated;

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

  async ngOnInit(): Promise<void> {
    await this.cargarPedidos();
  }

  async cargarPedidos() {
    try {
      const response = await this.pedidosService.getAll();
      this.totalPedidos = response.length;
      this.pedidos = response.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      this.totalPaginas = Math.ceil(this.totalPedidos / this.pageSize);
    } catch (error) {
      console.log('error al cargar pedidos', error)
    }
  }



  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.cargarPedidos();
    }
  }
  
  nextPage() {
  
    if (this.currentPage < this.totalPaginas) {
      this.currentPage++;
      this.cargarPedidos();
    }
  }
}
