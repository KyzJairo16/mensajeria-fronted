import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Registro } from './registro/registro';
import { Login } from './login/login';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
