import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.html',
  standalone: false,
  styleUrls: ['./cliente.css'],
})
export class Cliente implements OnInit {
  // 1. Creamos una variable para guardar los datos del usuario
  usuarioInfo: any = null;

  ngOnInit(): void {
    // 2. Se ejecuta al cargar la página
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    // 3. Traemos el texto guardado en el login
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');

    if (usuarioGuardado) {
      // 4. Lo convertimos en un objeto manejable por Angular
      this.usuarioInfo = JSON.parse(usuarioGuardado);
    }
  }
  cerrarSesion() {
    // Borramos los datos del usuario logueado por seguridad
    localStorage.removeItem('usuarioLogueado');
    this.usuarioInfo = null;
  }
}
