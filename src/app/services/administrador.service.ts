import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AdministradorModel } from '../models/administrador.model';

@Injectable({
  providedIn: 'root',
})
export class AdministradorService {
  private administrador = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';


  getAdministradores() {
    return this.administrador.get<AdministradorModel[]>(this.urlbase + 'administrador/mostrartodo', {
      observe: 'response',
    });
  }


  crearAdministrador(nombre: string, cedula: string, correo: string, telefono: string, turno: string, usuario: string, contrasenia:string) {

    return this.administrador.post(this.urlbase + '/administrador/crear?nombre=' + nombre + '&cedula=' + cedula + '&correo=' + correo + '&telefono=' + telefono + '&turno='+ turno +'&usuario=' + usuario + '&contrasenia=' +contrasenia, null, {
      responseType: 'text',
    });
  }


  actualizarAdministrador( id:number, nombre: string, cedula: string, correo: string, telefono: string, turno: string, usuario: string, contrasenia:string) {

    return this.administrador.put(this.urlbase + '/administrador/actualizar?id=' + id +'&nombre=' + nombre + '&cedula=' + cedula + '&correo=' + correo + '&telefono=' + telefono + '&turno='+ turno +'&usuario=' + usuario + '&contrasenia=' +contrasenia, null, {
      responseType: 'text',
    });
  }


  eliminarAdministrador(id: number) {
    return this.administrador.delete(this.urlbase + '/administrador/eliminar?id=' + id, {
      responseType: 'text',
    });
  }


  buscarPorNombre(nombre: string) {
    return this.administrador.get<AdministradorModel[]>(this.urlbase + 'administrador/buscarpornombre?nombre=' + nombre, {
      observe: 'response',
    });
  }


  buscarPorCedula(cedula: string) {
    return this.administrador.get<AdministradorModel[]>(this.urlbase + 'administrador/buscarporcedula?cedula=' + cedula, {
      observe: 'response',
    });
  }


  buscarPorCorreo(correo: string) {
    return this.administrador.get<AdministradorModel[]>(this.urlbase + 'administrador/buscarporcorreo?correo=' + correo, {
      observe: 'response',
    });
  }


  buscarPorTelefono(telefono: string) {
    return this.administrador.get<AdministradorModel[]>(this.urlbase + 'administrador/buscarportelefono?telefono=' + telefono, {
      observe: 'response',
    });
  }


  buscarPorUsuario(usuario: string) {
    return this.administrador.get<AdministradorModel[]>(this.urlbase + 'administrador/buscarporusuario?usuario=' + usuario, {
      observe: 'response',
    });
  }


  buscarPorNombreYCedula(nombre: string, cedula: string) {
    return this.administrador.get<AdministradorModel[]>(this.urlbase + 'administrador/buscarpornombreycedula?nombre=' + nombre + '&cedula=' + cedula, {
      observe: 'response',
    });
  }
}
