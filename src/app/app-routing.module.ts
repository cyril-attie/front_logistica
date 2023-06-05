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
import { LoginGuard } from './guards/login.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/pedidos'},
  { path: 'login', 
    component: LoginFormComponent, 
    canDeactivate: [LoginGuard]},
  { path: 'pedidos', 
    component: PedidosComponent, 
    canActivate: [LoginGuard,RoleGuard],
    data: {role : ['JEFE_DE_EQUIPO','ENCARGADO','OPERARIO']}
  },
  { path: 'pedido/nuevo', 
    component: DetallePedidoFormComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : ['JEFE_DE_EQUIPO','ENCARGADO','OPERARIO']}
  },
  { path: 'pedido/:id',
    component: DetallePedidoFormComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : ['JEFE_DE_EQUIPO','ENCARGADO','OPERARIO']}
  },
  { path: 'usuarios', 
    component: UsuariosComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : ['JEFE_DE_EQUIPO']}
  },
  { path: 'usuario/nuevo',
    component: DetalleUsuarioFormComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : ['JEFE_DE_EQUIPO']}
  },
  { path: 'usuario/:id', 
    component: DetalleUsuarioFormComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : ['JEFE_DE_EQUIPO']}
  },
  { path: 'almacenes', 
    component: AlmacenesComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : ['ENCARGADO']}
  },
  { path: 'almacen/nuevo',
    component: DetalleAlmacenFormComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : ['ENCARGADO']}
  },
  { path: 'almacen/:id',
    component: DetalleAlmacenFormComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : ['ENCARGADO']}
  },
  { path: 'camiones',
    component: CamionesComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : ['JEFE_DE_EQUIPO']}
  },
  { path: 'comion/nuevo',
    component: DetalleCamionFormComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : ['JEFE_DE_EQUIPO']}
  },
  { path: 'comion/:id',
    component: DetalleCamionFormComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : ['JEFE_DE_EQUIPO']}
  },
  { path: 'materiales',
    component: MaterialesComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : ['ENCARGADO']}
  },
  { path: 'material/nuevo',
    component: DetalleMaterialFormComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : ['ENCARGADO']}
  },
  { path: 'material/:id',
    component: DetalleMaterialFormComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : ['ENCARGADO']}
  },
  { path: 'perfil',
    component: DetallePerfilFormComponent, 
    canActivate: [LoginGuard,RoleGuard],
    data: {role : ['JEFE_DE_EQUIPO','ENCARGADO','OPERARIO']}
  },
  { path: '**', redirectTo: '/pedidos' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
