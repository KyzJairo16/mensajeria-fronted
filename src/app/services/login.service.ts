import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Ajusta el puerto si tu Spring Boot no usa el 8080
  private URL_BASE = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  /**
   * Envía la cédula y contraseña a la ruta del controlador específica.
   */
  validarUsuario(cedula: string, contrasenia: string, tipoRuta: string): Observable<any> {
    let params = new HttpParams()
      .set('cedula', cedula)
      .set('contrasenia', contrasenia);

    // Llama a /clientenormal/login, /clientepremium/login, etc.
    return this.http.get(`${this.URL_BASE}/${tipoRuta}/login`, { params });
  }
}
