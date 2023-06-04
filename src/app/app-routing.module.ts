import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/formulario/login-form/login-form.component';
import { AlmacenesComponent } from './components/tabla/almacenes/almacenes.component';
import { CamionesComponent } from './components/tabla/camiones/camiones.component';
import { MaterialesComponent } from './components/tabla/materiales/materiales.component';
import { PedidosComponent } from './components/tabla/pedidos/pedidos.component';
import { DetallePedidoFormComponent } from './components/formulario/detalle-pedido-form/detalle-pedido-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login'},
  { path: 'login', component: LoginFormComponent},
  { path: 'almacenes', component: AlmacenesComponent},
  { path: 'camiones', component: CamionesComponent},
  { path: 'materiales', component: MaterialesComponent},
  { path: 'pedidos', component: PedidosComponent},
  { path: 'almacenes', component: AlmacenesComponent},
  { path: 'pedido/nuevo', component: DetallePedidoFormComponent},
  { path: 'pedido/:idPedido', component: DetallePedidoFormComponent},
  { path: 'pedido/:idPedido', component: DetallePedidoFormComponent},

  { path: '**', redirectTo: '/login' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
