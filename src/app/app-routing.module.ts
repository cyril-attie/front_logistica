import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Importamos variables globales
import * as myGlobals from './general/globals';


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
import { CategoriasComponent } from './components/tabla/categorias/categorias.component';
import { DetalleCategoriasFormComponent } from './components/formulario/detalle-categorias-form/detalle-categorias-form.component';




const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/pedidos'},
  { path: 'login', 
    component: LoginFormComponent,
    canActivate: [LoginGuard],
    data: {pantallaLogin : true}
  },
  { path: 'pedidos', 
    component: PedidosComponent, 
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [myGlobals.rolSuperusuario, myGlobals.rolJefeDeEquipo,myGlobals.rolEncargado,myGlobals.rolOperario]}
  },
  { path: 'pedido/nuevo', 
    component: DetallePedidoFormComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [myGlobals.rolOperario]}
  },
  { path: 'pedido/:id',
    component: DetallePedidoFormComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [myGlobals.rolSuperusuario,myGlobals.rolJefeDeEquipo,myGlobals.rolEncargado,myGlobals.rolOperario]}
  },
  { path: 'usuarios', 
    component: UsuariosComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [myGlobals.rolSuperusuario,myGlobals.rolJefeDeEquipo]}
  },
  { path: 'usuario/nuevo',
    component: DetalleUsuarioFormComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [myGlobals.rolSuperusuario,myGlobals.rolJefeDeEquipo]}
  },
  { path: 'usuario/:id', 
    component: DetalleUsuarioFormComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [myGlobals.rolSuperusuario,myGlobals.rolJefeDeEquipo]}
  },
  { path: 'almacenes', 
    component: AlmacenesComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [myGlobals.rolJefeDeEquipo]}
  },
  { path: 'almacen/nuevo',
    component: DetalleAlmacenFormComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [myGlobals.rolJefeDeEquipo]}
  },
  { path: 'almacen/:id',
    component: DetalleAlmacenFormComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [myGlobals.rolJefeDeEquipo]}
  },
  { path: 'camiones',
    component: CamionesComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [myGlobals.rolSuperusuario,myGlobals.rolJefeDeEquipo, ]}
  },
  { path: 'camion/nuevo',
    component: DetalleCamionFormComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [myGlobals.rolSuperusuario,myGlobals.rolJefeDeEquipo]}
  },
  { path: 'camion/:id',
    component: DetalleCamionFormComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [myGlobals.rolSuperusuario,myGlobals.rolJefeDeEquipo]}
  },
  { path: 'materiales',
    component: MaterialesComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [myGlobals.rolEncargado]}
  },
  { path: 'material/nuevo',
    component: DetalleMaterialFormComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [myGlobals.rolEncargado]}
  },
  { path: 'material/:id',
  component: DetalleMaterialFormComponent,
  canActivate: [LoginGuard,RoleGuard],
  data: {role : [myGlobals.rolEncargado]}
},
  { path: 'categorias',
    component: CategoriasComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [myGlobals.rolEncargado]}
  },
  { path: 'categoria/nuevo',
    component: DetalleCategoriasFormComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [myGlobals.rolEncargado]}
  },
  { path: 'categoria/:id',
  component: DetalleCategoriasFormComponent,
  canActivate: [LoginGuard,RoleGuard],
  data: {role : [myGlobals.rolEncargado]}
},
  { path: 'perfil',
    component: DetallePerfilFormComponent, 
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [myGlobals.rolSuperusuario,myGlobals.rolJefeDeEquipo,myGlobals.rolEncargado,myGlobals.rolOperario]}
  },
  { path: '**', redirectTo: '/pedidos' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
