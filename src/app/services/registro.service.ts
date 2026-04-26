import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientenormalService {
  constructor(private http: HttpClient) {}

  crearClienteNormal(nombre: string, cedula: string, correo: string, telefono: string, contrasenia: string): Observable<string> {
    // Configuración obligatoria para @RequestParam en Spring Boot
    const params = new HttpParams()
      .set('nombre', nombre)
      .set('cedula', cedula)
      .set('correo', correo)
      .set('telefono', telefono)
      .set('contrasenia', contrasenia);

    return this.http.post('http://localhost:8080/clientenormal/crear', null, {
      params,
      responseType: 'text' // Evita que Angular intente leerlo como JSON
    });
  }
}
