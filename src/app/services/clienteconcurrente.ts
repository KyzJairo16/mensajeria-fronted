import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteconcurrenteModel } from '../models/clienteconcurrente.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteconcurrenteService {
  private cliente = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';


  getClientesConcurrentes() {
    return this.cliente.get<ClienteconcurrenteModel[]>(this.urlbase + '/clienteconcurrente/mostrartodo', {
      observe: 'response',
    });
  }


  crearClienteConcurrente(nombre: string, cedula: string, correo: string, telefono: string, metodoPago: string, tipoPedido: string, tarifaConcurrente: number) {
    return this.cliente.post(this.urlbase + '/clienteconcurrente/crear?nombre=' + nombre + '&cedula=' + cedula + '&correo=' + correo + '&telefono=' + telefono + '&metodoPago=' + metodoPago + '&tipoPedido=' + tipoPedido + '&tarifaConcurrente=' + tarifaConcurrente, null, {
      responseType: 'text',
    });
  }


  actualizarClienteConcurrente(id: number, nombre: string, cedula: string, correo: string, telefono: string, metodoPago: string, tipoPedido: string, tarifaConcurrente: number) {
    return this.cliente.put(this.urlbase + '/clienteconcurrente/actualizarclienteconcurrente?id=' + id + '&nombre=' + nombre + '&cedula=' + cedula + '&correo=' + correo + '&telefono=' + telefono + '&metodoPago=' + metodoPago + '&tipoPedido=' + tipoPedido + '&tarifaConcurrente=' + tarifaConcurrente, null, {
      responseType: 'text',
    });
  }


  eliminarClienteConcurrente(id: number) {
    return this.cliente.delete(this.urlbase + '/clienteconcurrente/eliminar?id=' + id, {
      responseType: 'text',
    });
  }


  buscarPorNombre(nombre: string) {
    return this.cliente.get<ClienteconcurrenteModel[]>(this.urlbase + '/clienteconcurrente/buscarpornombre?nombre=' + nombre, {
      observe: 'response',
    });
  }

  buscarPorCedula(cedula: string) {
    return this.cliente.get<ClienteconcurrenteModel[]>(this.urlbase + '/clienteconcurrente/buscarporcedula?cedula=' + cedula, {
      observe: 'response',
    });
  }

  buscarPorCorreo(correo: string) {
    return this.cliente.get<ClienteconcurrenteModel[]>(this.urlbase + '/clienteconcurrente/buscarporcorreo?correo=' + correo, {
      observe: 'response',
    });
  }

  buscarPorTelefono(telefono: string) {
    return this.cliente.get<ClienteconcurrenteModel[]>(this.urlbase + '/clienteconcurrente/buscarportelefono?telefono=' + telefono, {
      observe: 'response',
    });
  }
}
