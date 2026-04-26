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
  tituloTarifa: string = 'Cargando tarifa...';
  valorTarifa: string | number = '';

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
      this.calcularTarifa();
    }
  }
  cerrarSesion() {
    // Borramos los datos del usuario logueado por seguridad
    localStorage.removeItem('usuarioLogueado');
    this.usuarioInfo = null;
  }

  calcularTarifa() {

    if (this.usuarioInfo.tarifaPremium !== undefined && this.usuarioInfo.tarifaPremium !== null) {
      this.tituloTarifa = 'Tu Tarifa Especial Premium';
      this.valorTarifa = `15% de descuento`;

    } else if (this.usuarioInfo.tarifaConcurrente !== undefined && this.usuarioInfo.tarifaConcurrente !== null) {
      this.tituloTarifa = 'Tu Tarifa Concurrente';
      this.valorTarifa = `5% de descuento`;

    } else if (this.usuarioInfo.tarifaNormal !== undefined && this.usuarioInfo.tarifaNormal !== null) {
      this.tituloTarifa = 'Tu Tarifa Normal';
      this.valorTarifa = `0% de descuento`;

    } else {
      this.tituloTarifa = `No se encontro alguna tarifa para tu tipo'}`;
      this.valorTarifa = '0% de descuento';
    }
  }
}
