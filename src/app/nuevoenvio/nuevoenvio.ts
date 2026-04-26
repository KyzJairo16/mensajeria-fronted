import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaquetealimenticioService } from '../services/paquetealimenticio.service';
import { PaquetenoalimenticioService } from '../services/paquetenoalimenticio.service';
import { PaquetecartaService } from '../services/paquetecarta.service';

@Component({
  selector: 'app-registro-envio',
  standalone: false,
  templateUrl: './nuevoenvio.html',
  styleUrls: ['./nuevoenvio.css']
})
export class Nuevoenvio {

  tipoSeleccionado: string = 'alimenticio';
  mensajeError: string = '';
  mensajeExito: string = '';

  paquete = {
    ciudadDestino: '',
    direccionDestino: '',
    tipoDeAlimento: '',
    descripcionContenido: '',
    tipoCarta: '',
    tamanio: 'Pequeño',
    metodoPago: 'PSE',
    esPrioritario: false,
    esFragil: false
  };

  ciudades: string[] = [
    'Armenia', 'Barranquilla', 'Bogotá', 'Bucaramanga', 'Cali',
    'Cartagena', 'Cúcuta', 'Florencia', 'Ibagué', 'Manizales',
    'Medellín', 'Montería', 'Neiva', 'Pasto', 'Pereira',
    'Popayán', 'Quibdó', 'Riohacha', 'Santa Marta', 'Sincelejo',
    'Tunja', 'Valledupar', 'Villavicencio', 'Yopal'
  ].sort();

  constructor(
    private router: Router,
    private alimenticioSvc: PaquetealimenticioService,
    private noAlimenticioSvc: PaquetenoalimenticioService,
    private cartaSvc: PaquetecartaService
  ) {}

  private get idCliente(): number {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado') ?? '{}');
    return Number(usuario.id ?? 0);
  }

  guardarEnvio() {
    this.mensajeError = '';
    this.mensajeExito = '';

    const { ciudadDestino, direccionDestino, tamanio } = this.paquete;

    if (!ciudadDestino || !direccionDestino) {
      this.mensajeError = 'Por favor completa la ciudad y dirección de destino.';
      return;
    }

    if (this.tipoSeleccionado === 'alimenticio') {
      if (!this.paquete.tipoDeAlimento) {
        this.mensajeError = 'Ingresa el tipo de alimento.';
        return;
      }
      this.alimenticioSvc.crearPaqueteAlimenticio(
        direccionDestino, tamanio, ciudadDestino,
        this.idCliente, this.paquete.tipoDeAlimento, this.paquete.esPrioritario
      ).subscribe({
        next: (res) => this.handleExito(res.body ?? ''),  // ✅ CORREGIDO
        error: (err) => this.handleError(err)
      });

    } else if (this.tipoSeleccionado === 'no-alimenticio') {
      this.noAlimenticioSvc.crearPaqueteNoAlimenticio(
        this.idCliente, direccionDestino, tamanio,
        ciudadDestino, this.paquete.esFragil, this.paquete.esPrioritario
      ).subscribe({
        next: (res) => this.handleExito(res.body ?? ''),  // ✅ CORREGIDO
        error: (err) => this.handleError(err)
      });

    } else if (this.tipoSeleccionado === 'carta') {
      if (!this.paquete.tipoCarta) {
        this.mensajeError = 'Ingresa la categoría de carta.';
        return;
      }

      this.cartaSvc.crearPaqueteCarta(
        this.idCliente, direccionDestino, tamanio,
        ciudadDestino, this.paquete.tipoCarta, this.paquete.esPrioritario
      ).subscribe({
        next: (res) => this.handleExito(res.body ?? ''),  // ✅ CORREGIDO
        error: (err) => this.handleError(err)
      });
    }
  }

  private handleExito(mensaje: string) {
    this.mensajeExito = mensaje;
    setTimeout(() => this.router.navigate(['/cliente']), 1500);
  }

  private handleError(err: any) {
    // ✅ CORREGIDO: err.error llega como string con el mensaje exacto del backend
    if (typeof err.error === 'string' && err.error.trim().length > 0) {
      this.mensajeError = err.error;
    } else {
      this.mensajeError = 'Error al registrar el envío.';
    }
  }
}
