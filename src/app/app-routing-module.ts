import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Registro } from './registro/registro';
import { Inicio } from './inicio/inicio';
import { Login } from './login/login';
import { Administrador } from './administrador/administrador';
import { Inicioadministrador } from './inicioadministrador/inicioadministrador';
import {Cliente} from './cliente/cliente';
import {Gestorcliente} from './gestorcliente/gestorcliente';
import {Nuevoenvio} from './nuevoenvio/nuevoenvio';
import {Gestortrabajador} from './gestortrabajador/gestortrabajador';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'inicio', component: Inicio },
  { path: 'registro', component: Registro },
  {path: 'administrador', component: Administrador },
  {path: 'inicioadministrador',component: Inicioadministrador },
  {path: 'cliente', component: Cliente },
  {path: 'gestorcliente', component: Gestorcliente },
  {path: 'nuevoenvio', component : Nuevoenvio},
  {path: 'gestortrabajador', component: Gestortrabajador },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
