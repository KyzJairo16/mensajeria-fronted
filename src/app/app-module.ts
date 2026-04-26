import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http'; // Importación moderna de HTTP

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
    Cliente,
    Nuevoenvio,
    Gestortrabajador,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App],
})
export class AppModule {}
