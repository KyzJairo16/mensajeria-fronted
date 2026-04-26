import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Registro } from './registro/registro';
import { Inicio } from './inicio/inicio';
import { Login } from './login/login';
import { Administrador } from './administrador/administrador';
import { Inicioadministrador } from './inicioadministrador/inicioadministrador';
import { Cliente } from './cliente/cliente';
import { Gestorcliente } from './gestorcliente/gestorcliente';
import { RegistroEnvioComponent } from './nuevoenvio/nuevoenvio'; // ✅ CORREGIDO
import { Gestortrabajador } from './gestortrabajador/gestortrabajador';
import { Gestorpaquete } from './gestorpaquete/gestorpaquete';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', component: Inicio },
  { path: 'registro', component: Registro },
  { path: 'administrador', component: Administrador },
  { path: 'inicioadministrador', component: Inicioadministrador },
  { path: 'cliente', component: Cliente },
  { path: 'gestorcliente', component: Gestorcliente },
  { path: 'nuevoenvio', component: RegistroEnvioComponent },
  { path: 'gestortrabajador', component: Gestortrabajador },
  { path: 'gestorpaquete', component: Gestorpaquete },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
