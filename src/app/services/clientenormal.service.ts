import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientenormalModel } from '../models/clientenormal.model';


@Injectable({
  providedIn: 'root',
})
export class ClientenormalService {
  private cliente = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';

  // Mostrar todos
  getClientesNormales() {
    return this.cliente.get<ClientenormalModel[]>(this.urlbase + '/clientenormal/mostrar', {
      observe: 'response',
    });
  }


  crearClienteNormal(nombre: string, cedula: string, correo: string, telefono: string, contrasenia: string) {
    return this.cliente.post(this.urlbase + '/clientenormal/crear?nombre=' + nombre + '&cedula=' + cedula + '&correo=' + correo + '&telefono=' + telefono + '&contrasenia=' + contrasenia, null, {
      responseType: 'text',
    });
  }


  actualizarClienteNormal(id: number, nombre: string, cedula: string, correo: string, telefono: string, metodoPago: string, tipoPedido: string, tarifaNormal: number) {
    return this.cliente.put(this.urlbase + '/clientenormal/actualizarclientenormal?id=' + id + '&nombre=' + nombre + '&cedula=' + cedula + '&correo=' + correo + '&telefono=' + telefono + '&metodoPago=' + metodoPago + '&tipoPedido=' + tipoPedido + '&tarifaNormal=' + tarifaNormal, null, {
      responseType: 'text',
    });
  }


  eliminarClienteNormal(id: number) {
    return this.cliente.delete(this.urlbase + '/clientenormal/eliminar?id=' + id, {
      responseType: 'text',
    });
  }


  buscarPorNombre(nombre: string) {
    return this.cliente.get<ClientenormalModel[]>(this.urlbase + '/clientenormal/buscarpornombre?nombre=' + nombre, {
      observe: 'response',
    });
  }

  buscarPorCedula(cedula: string) {
    return this.cliente.get<ClientenormalModel[]>(this.urlbase + '/clientenormal/buscarporcedula?cedula=' + cedula, {
      observe: 'response',
    });
  }

  buscarPorCorreo(correo: string) {
    return this.cliente.get<ClientenormalModel[]>(this.urlbase + '/clientenormal/buscarporcorreo?correo=' + correo, {
      observe: 'response',
    });
  }

  buscarPorTelefono(telefono: string) {
    return this.cliente.get<ClientenormalModel[]>(this.urlbase + '/clientenormal/buscarportelefono?telefono=' + telefono, {
      observe: 'response',
    });
  }
}
