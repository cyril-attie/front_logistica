import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/formulario/login-form/login-form.component';
import { AlmacenesComponent } from './components/tabla/almacenes/almacenes.component';
import { CamionesComponent } from './components/tabla/camiones/camiones.component';
import { MaterialesComponent } from './components/tabla/materiales/materiales.component';
import { PedidosComponent } from './components/tabla/pedidos/pedidos.component';
import { DetallePedidoFormComponent } from './components/formulario/detalle-pedido-form/detalle-pedido-form.component';
import { UsuariosComponent } from './components/tabla/usuarios/usuarios.component';
import { DetalleUsuarioFormComponent } from './components/formulario/detalle-usuario-form/detalle-usuario-form.component';
import { DetalleAlmacenFormComponent } from './components/formulario/detalle-almacen-form/detalle-almacen-form.component';
import { DetalleCamionFormComponent } from './components/formulario/detalle-camion-form/detalle-camion-form.component';
import { DetalleMaterialFormComponent } from './components/formulario/detalle-material-form/detalle-material-form.component';
import { DetallePerfilFormComponent } from './components/formulario/detalle-perfil-form/detalle-perfil-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/pedidos'},
  { path: 'login', component: LoginFormComponent},
  { path: 'pedidos', component: PedidosComponent},
  { path: 'pedido/nuevo', component: DetallePedidoFormComponent},
  { path: 'pedido/:id', component: DetallePedidoFormComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'usuario/nuevo', component: DetalleUsuarioFormComponent},
  { path: 'usuario/:id', component: DetalleUsuarioFormComponent},
  { path: 'almacenes', component: AlmacenesComponent},
  { path: 'almacen/nuevo', component: DetalleAlmacenFormComponent},
  { path: 'almacen/:id', component: DetalleAlmacenFormComponent},
  { path: 'camiones', component: CamionesComponent},
  { path: 'comion/nuevo', component: DetalleCamionFormComponent},
  { path: 'comion/:id', component: DetalleCamionFormComponent},
  { path: 'materiales', component: MaterialesComponent},
  { path: 'material/nuevo', component: DetalleMaterialFormComponent},
  { path: 'material/:id', component: DetalleMaterialFormComponent},
  { path: 'perfil', component: DetallePerfilFormComponent},
  { path: '**', redirectTo: '/pedidos' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
