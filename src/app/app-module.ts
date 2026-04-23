import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { Registro } from './registro/registro';

@NgModule({
  declarations: [App, Navbar, Footer, Registro],

  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
