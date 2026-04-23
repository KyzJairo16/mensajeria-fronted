import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConductorModel } from '../models/conductor.model';
@Injectable({
  providedIn: 'root',
})
export class ConductorService {
  private conductor = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';


  getConductores() {
    return this.conductor.get<ConductorModel[]>(this.urlbase + '/conductor/mostrartodo', {
      observe: 'response',
    });
  }


  crearConductor(nombre: string, cedula: string, correo: string, telefono: string, turno: string, placaVehiculo: string) {
    return this.conductor.post(this.urlbase + '/conductor/crear?nombre=' + nombre + '&cedula=' + cedula + '&correo=' + correo + '&telefono=' + telefono + '&turno=' + turno + '&placaVehiculo=' + placaVehiculo, null, {
      responseType: 'text',
    });
  }


  actualizarConductor(id: number, nombre: string, cedula: string, correo: string, telefono: string, turno: string, placaVehiculo: string) {
    return this.conductor.put(this.urlbase + '/conductor/actualizar?id=' + id + '&nombre=' + nombre + '&cedula=' + cedula + '&correo=' + correo + '&telefono=' + telefono + '&turno=' + turno + '&placaVehiculo=' + placaVehiculo, null, {
      responseType: 'text',
    });
  }


  eliminarConductor(id: number) {
    return this.conductor.delete(this.urlbase + '/conductor/eliminar?id=' + id, {
      responseType: 'text',
    });
  }



  buscarPorNombre(nombre: string) {
    return this.conductor.get<ConductorModel[]>(this.urlbase + '/conductor/buscarpornombre?nombre=' + nombre, {
      observe: 'response',
    });
  }

  buscarPorCedula(cedula: string) {
    return this.conductor.get<ConductorModel[]>(this.urlbase + '/conductor/buscarporcedula?cedula=' + cedula, {
      observe: 'response',
    });
  }

  buscarPorCorreo(correo: string) {
    return this.conductor.get<ConductorModel[]>(this.urlbase + '/conductor/buscarporcorreo?correo=' + correo, {
      observe: 'response',
    });
  }

  buscarPorTelefono(telefono: string) {
    return this.conductor.get<ConductorModel[]>(this.urlbase + '/conductor/buscarportelefono?telefono=' + telefono, {
      observe: 'response',
    });
  }

  buscarPorTurno(turno: string) {
    return this.conductor.get<ConductorModel[]>(this.urlbase + '/conductor/buscarporturno?turno=' + turno, {
      observe: 'response',
    });
  }

  buscarPorPlaca(placa: string) {
    return this.conductor.get<ConductorModel[]>(this.urlbase + '/conductor/buscarporplaca?placaVehiculo=' + placa, {
      observe: 'response',
    });
  }
}
