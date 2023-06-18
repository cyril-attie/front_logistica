// Librerías 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

// Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsuariosComponent } from './components/tabla/usuarios/usuarios.component';
import { AlmacenesComponent } from './components/tabla/almacenes/almacenes.component';
import { CamionesComponent } from './components/tabla/camiones/camiones.component';
import { MaterialesComponent } from './components/tabla/materiales/materiales.component';
import { PedidosComponent } from './components/tabla/pedidos/pedidos.component';
import { StockComponent } from './components/tabla/stock/stock.component';
import { CategoriasComponent } from './components/tabla/categorias/categorias.component';
import { LoginFormComponent } from './components/formulario/login-form/login-form.component';
import { DetallePedidoFormComponent } from './components/formulario/detalle-pedido-form/detalle-pedido-form.component';
import { DetallePerfilFormComponent } from './components/formulario/detalle-perfil-form/detalle-perfil-form.component';
import { DetalleUsuarioFormComponent } from './components/formulario/detalle-usuario-form/detalle-usuario-form.component';
import { DetalleAlmacenFormComponent } from './components/formulario/detalle-almacen-form/detalle-almacen-form.component';
import { DetalleMaterialFormComponent } from './components/formulario/detalle-material-form/detalle-material-form.component';
import { DetalleCamionFormComponent } from './components/formulario/detalle-camion-form/detalle-camion-form.component';
import { DetalleCategoriasFormComponent } from './components/formulario/detalle-categorias-form/detalle-categorias-form.component';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';
import { TablaComponent } from './components/utils/tabla/tabla.component';
import { ItemTablaComponent } from './components/utils/item-tabla/item-tabla.component';
import { DeleteButtonComponent } from './components/utils/delete-button/delete-button.component';

// Pipes
import { CapitalizePipe } from './pipes/capitalize.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UsuariosComponent,
    AlmacenesComponent,
    CamionesComponent,
    MaterialesComponent,
    PedidosComponent,
    StockComponent,
    CategoriasComponent,
    LoginFormComponent,
    DetallePedidoFormComponent,
    DetallePerfilFormComponent,
    DetalleUsuarioFormComponent,
    DetalleAlmacenFormComponent,
    DetalleMaterialFormComponent,
    DetalleCamionFormComponent,
    DetalleCategoriasFormComponent,
    SubHeaderComponent,
    TablaComponent,
    ItemTablaComponent,
    DeleteButtonComponent,
    CapitalizePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
