// Librerías 
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { UsuariosComponent } from './components/tabla/usuarios/usuarios.component';
import { AlmacenesComponent } from './components/tabla/almacenes/almacenes.component';
import { CamionesComponent } from './components/tabla/camiones/camiones.component';
import { MaterialesComponent } from './components/tabla/materiales/materiales.component';
import { PedidosComponent } from './components/tabla/pedidos/pedidos.component';
import { StockComponent } from './components/tabla/stock/stock.component';
import { LoginFormComponent } from './components/formulario/login-form/login-form.component';
import { DetallePedidoFormComponent } from './components/formulario/detalle-pedido-form/detalle-pedido-form.component';
import { DetallePerfilFormComponent } from './components/formulario/detalle-perfil-form/detalle-perfil-form.component';
import { DetalleUsuarioFormComponent } from './components/formulario/detalle-usuario-form/detalle-usuario-form.component';
import { DetalleAlmacenFormComponent } from './components/formulario/detalle-almacen-form/detalle-almacen-form.component';
import { DetalleMaterialFormComponent } from './components/formulario/detalle-material-form/detalle-material-form.component';
import { DetalleCamionFormComponent } from './components/formulario/detalle-camion-form/detalle-camion-form.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    UsuariosComponent,
    AlmacenesComponent,
    CamionesComponent,
    MaterialesComponent,
    PedidosComponent,
    StockComponent,
    LoginFormComponent,
    DetallePedidoFormComponent,
    DetallePerfilFormComponent,
    DetalleUsuarioFormComponent,
    DetalleAlmacenFormComponent,
    DetalleMaterialFormComponent,
    DetalleCamionFormComponent,
  ],
  imports: [
    BrowserModule,
<<<<<<< develop
    AppRoutingModule, 
<<<<<<< HEAD
    HttpClientModule
=======
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
>>>>>>> Detalle Pedido Form
=======
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
>>>>>>> develop
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
