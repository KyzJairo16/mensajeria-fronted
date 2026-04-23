import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Registro } from './registro/registro';
import { Inicio } from './inicio/inicio';
import { Login } from './login/login';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', component: Inicio },
  { path: 'registro', component: Registro },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
