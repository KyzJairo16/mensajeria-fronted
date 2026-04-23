import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ManipuladordepaqueteModel } from '../models/manipuladordepaquete.model';

@Injectable({
  providedIn: 'root',
})
export class ManipuladordepaqueteService{
  private manipulador = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';


  getManipuladores() {
    return this.manipulador.get<ManipuladordepaqueteModel[]>(this.urlbase + '/manipuladordepaquete/mostrartodo', {
      observe: 'response',
    });
  }


  crearManipulador(nombre: string, cedula: string, correo: string, telefono: string, turno: string, tipoManipulador: string) {
    return this.manipulador.post(this.urlbase + '/manipuladordepaquete/crear?nombre=' + nombre + '&cedula=' + cedula + '&correo=' + correo + '&telefono=' + telefono + '&turno=' + turno + '&tipoManipulador=' + tipoManipulador, null, {
      responseType: 'text',
    });
  }


  actualizarManipulador(id: number, nombre: string, cedula: string, correo: string, telefono: string, turno: string, tipoManipulador: string) {
    return this.manipulador.put(this.urlbase + '/manipuladordepaquete/actualizar?id=' + id + '&nombre=' + nombre + '&cedula=' + cedula + '&correo=' + correo + '&telefono=' + telefono + '&turno=' + turno + '&tipoManipulador=' + tipoManipulador, null, {
      responseType: 'text',
    });
  }


  eliminarManipulador(id: number) {
    return this.manipulador.delete(this.urlbase + '/manipuladordepaquete/eliminar?id=' + id, {
      responseType: 'text',
    });
  }



  buscarPorNombre(nombre: string) {
    return this.manipulador.get<ManipuladordepaqueteModel[]>(this.urlbase + '/manipuladordepaquete/buscarpornombre?nombre=' + nombre, {
      observe: 'response',
    });
  }

  buscarPorCedula(cedula: string) {
    return this.manipulador.get<ManipuladordepaqueteModel[]>(this.urlbase + '/manipuladordepaquete/buscarporcedula?cedula=' + cedula, {
      observe: 'response',
    });
  }

  buscarPorCorreo(correo: string) {
    return this.manipulador.get<ManipuladordepaqueteModel[]>(this.urlbase + '/manipuladordepaquete/buscarporcorreo?correo=' + correo, {
      observe: 'response',
    });
  }

  buscarPorTelefono(telefono: string) {
    return this.manipulador.get<ManipuladordepaqueteModel[]>(this.urlbase + '/manipuladordepaquete/buscarportelefono?telefono=' + telefono, {
      observe: 'response',
    });
  }

  buscarPorTurno(turno: string) {
    return this.manipulador.get<ManipuladordepaqueteModel[]>(this.urlbase + '/manipuladordepaquete/buscarporturno?turno=' + turno, {
      observe: 'response',
    });
  }

  buscarPorTipoManipulador(tipoManipulador: string) {
    return this.manipulador.get<ManipuladordepaqueteModel[]>(this.urlbase + '/manipuladordepaquete/buscarportipomanipulador?tipoManipulador=' + tipoManipulador, {
      observe: 'response',
    });
  }
}
