import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { forkJoin } from 'rxjs'; // Importante para unir las peticiones
import { PaquetecartaService } from '../services/paquetecarta.service';
import { PaquetealimenticioService } from '../services/paquetealimenticio.service';
import { PaquetenoalimenticioService } from '../services/paquetenoalimenticio.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.html',
  standalone: false,
  styleUrls: ['./cliente.css'],
})
export class Cliente implements OnInit {
  usuarioInfo: any = null;
  tituloTarifa: string = 'Cargando tarifa...';
  valorTarifa: string | number = '';
  listaEnvios: any[] = [];

  private cartaService = inject(PaquetecartaService);
  private alimentoService = inject(PaquetealimenticioService);
  private noAlimentoService = inject(PaquetenoalimenticioService);
  private cdr = inject(ChangeDetectorRef); // Inyectamos el detector de cambios

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      this.usuarioInfo = JSON.parse(usuarioGuardado);
      this.calcularTarifa();

      const idParaHistorial = this.usuarioInfo.id || this.usuarioInfo.cedula;
      if (idParaHistorial) {
        this.cargarTodosLosPaquetes(idParaHistorial);
      }
    }
  }

  cargarTodosLosPaquetes(idCliente: number) {
    console.log('Buscando historial para:', idCliente);

    // forkJoin lanza las 3 peticiones y espera a que TODAS terminen
    forkJoin({
      cartas: this.cartaService.verHistorial(idCliente),
      alimentos: this.alimentoService.verHistorial(idCliente),
      noAlimentos: this.noAlimentoService.verHistorial(idCliente)
    }).subscribe({
      next: (respuestas) => {
        // Unimos todos los resultados en un solo array
        const todasLasCartas = respuestas.cartas.body || [];
        const todosLosAlimentos = respuestas.alimentos.body || [];
        const todosLosNoAlimentos = respuestas.noAlimentos.body || [];

        this.listaEnvios = [...todasLasCartas, ...todosLosAlimentos, ...todosLosNoAlimentos];

        // Ordenamos por ID (del más reciente al más antiguo)
        this.listaEnvios.sort((a, b) => b.id - a.id);

        console.log('Total unificado:', this.listaEnvios.length, this.listaEnvios);

        // FORZAMOS A ANGULAR A ACTUALIZAR LA VISTA
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al traer paquetes:', err)
    });
  }

  calcularTarifa() {
    const info = this.usuarioInfo;
    if (info.tarifaPremium != null) {
      this.tituloTarifa = 'Tu Tarifa Especial Premium';
      this.valorTarifa = '15% de descuento';
    } else if (info.tarifaConcurrente != null) {
      this.tituloTarifa = 'Tu Tarifa Concurrente';
      this.valorTarifa = '5% de descuento';
    } else {
      this.tituloTarifa = 'Tu Tarifa no se encuentra visible';
      this.valorTarifa = '0% de descuento';
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    this.usuarioInfo = null;
  }
}
