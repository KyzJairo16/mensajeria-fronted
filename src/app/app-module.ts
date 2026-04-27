import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { Registro } from './registro/registro';
import { Login } from './login/login';
import { Inicio } from './inicio/inicio';
import { Administrador } from './administrador/administrador';
import { Inicioadministrador } from './inicioadministrador/inicioadministrador';
import { Gestorcliente } from './gestorcliente/gestorcliente';
import { Cliente } from './cliente/cliente';
import { Nuevoenvio } from './nuevoenvio/nuevoenvio';
import { Gestortrabajador } from './gestortrabajador/gestortrabajador';
import { Gestorpaquete } from './gestorpaquete/gestorpaquete';
import { Actualizarcliente } from './actualizarcliente/actualizarcliente';
import { Actualizartrabajador } from './actualizartrabajador/actualizartrabajador';
import { Actualizarpaquete } from './actualizarpaquete/actualizarpaquete';

@NgModule({
  declarations: [
    App,
    Navbar,
    Footer,
    Registro,
    Login,
    Inicio,
    Administrador,
    Inicioadministrador,
    Gestorcliente,
    Nuevoenvio,
    Gestortrabajador,
    Cliente,
    Gestorpaquete,
    Actualizarcliente,
    Actualizartrabajador,
    Actualizarpaquete,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, RouterModule, HttpClientModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
