import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Registro } from './registro/registro';
import { Inicio } from './inicio/inicio';
import { Login } from './login/login';
import { Administrador } from './administrador/administrador';
import { Inicioadministrador } from './inicioadministrador/inicioadministrador';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', component: Inicio },
  { path: 'registro', component: Registro },
  {path: 'administrador', component: Administrador },
  {path: 'inicioadministrador',component: Inicioadministrador },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
