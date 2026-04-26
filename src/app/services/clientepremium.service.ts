import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientepremiumModel } from '../models/clientepremium.model';

@Injectable({
  providedIn: 'root',
})
export class ClientepremiumService {
  private cliente = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';


  getClientesPremium() {
    return this.cliente.get<ClientepremiumModel[]>(this.urlbase + '/clientepremium/mostrartodo', {
      observe: 'response',
    });
  }

  crearClientePremium(nombre: string, cedula: string, correo: string, telefono: string, contrasenia: string) {
    return this.cliente.post(
      this.urlbase + '/clientepremium/crear?nombre=' +encodeURIComponent(nombre) +
      '&cedula=' +encodeURIComponent(cedula) +
      '&correo=' + encodeURIComponent(correo)+
      '&telefono=' +encodeURIComponent(telefono) +
      '&contrasenia=' +encodeURIComponent(contrasenia),
      null,
      { responseType: 'text' }
    );
  }


  actualizarClientePremium(id: number, nombre: string, cedula: string, correo: string, telefono: string, metodoPago: string, contrasenia: string) {
    return this.cliente.put(this.urlbase + '/clientepremium/actualizar?id=' + id + '&nombre=' + nombre + '&cedula=' + cedula + '&correo=' + correo + '&telefono=' + telefono + '&metodoPago=' + metodoPago + '&contrasenia=' + contrasenia, null, {
      responseType: 'text',
    });
  }


  eliminarClientePremium(id: number) {
    return this.cliente.delete(this.urlbase + '/clientepremium/eliminar?id=' + id, {
      responseType: 'text',
    });
  }



  buscarPorNombre(nombre: string) {
    return this.cliente.get<ClientepremiumModel[]>(this.urlbase + '/clientepremium/buscarpornombre?nombre=' + nombre, {
      observe: 'response',
    });
  }

  buscarPorCedula(cedula: string) {
    return this.cliente.get<ClientepremiumModel[]>(this.urlbase + '/clientepremium/buscarporcedula?cedula=' + cedula, {
      observe: 'response',
    });
  }

  buscarPorCorreo(correo: string) {
    return this.cliente.get<ClientepremiumModel[]>(this.urlbase + '/clientepremium/buscarporcorreo?correo=' + correo, {
      observe: 'response',
    });
  }

  buscarPorTelefono(telefono: string) {
    return this.cliente.get<ClientepremiumModel[]>(this.urlbase + '/clientepremium/buscarportelefono?telefono=' + telefono, {
      observe: 'response',
    });
  }
}
