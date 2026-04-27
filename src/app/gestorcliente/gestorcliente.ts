import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router'; // 1. Importación necesaria
import { ClientenormalService } from '../services/clientenormal.service';
import { ClienteconcurrenteService } from '../services/clienteconcurrente.service';
import { ClientepremiumService } from '../services/clientepremium.service';
import { ClientenormalModel } from '../models/clientenormal.model';
import { ClienteconcurrenteModel } from '../models/clienteconcurrente.model';
import { ClientepremiumModel } from '../models/clientepremium.model';
import { Subscription, timeout, catchError, of } from 'rxjs';

interface ClienteUnificado {
  id: number;
  nombre: string;
  cedula: string;
  correo: string;
  telefono: string;
  tipo: 'Normal' | 'Concurrente' | 'Premium';
  metodoPago?: string;
}

@Component({
  selector: 'app-gestorcliente',
  standalone: false,
  templateUrl: './gestorcliente.html',
  styleUrl: './gestorcliente.css',
})
export class Gestorcliente implements OnInit, OnDestroy {

  // Inyección de servicios
  private clienteNormalService = inject(ClientenormalService);
  private clienteConcurrenteService = inject(ClienteconcurrenteService);
  private clientePremiumService = inject(ClientepremiumService);
  private router = inject(Router); // 2. Inyección del Router

  // Estados de la vista
  clientes: ClienteUnificado[] = [];
  clientesFiltrados: ClienteUnificado[] = [];
  filtroActual: string = 'Todos';
  cargando: boolean = false;
  error: string = '';
  timeoutWarning: boolean = false;
  tiempoEspera: number = 0;
  historialVisible: { [key: string]: boolean } = {};
  mensajeExito: string = '';

  private subscriptions: Subscription[] = [];
  private timeoutId: any;
  private esperaInterval: any;

  ngOnInit(): void {
    this.recargarClientes();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.esperaInterval) clearInterval(this.esperaInterval);
  }

  // --- NAVEGACIÓN ---
  volverAlMenu(): void {
    this.router.navigate(['/administrador']);
  }

  // --- CARGA DE DATOS ---
  recargarClientes(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.esperaInterval) clearInterval(this.esperaInterval);
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];

    this.cargando = true;
    this.error = '';
    this.mensajeExito = '';
    this.timeoutWarning = false;
    this.tiempoEspera = 0;
    this.clientes = [];
    this.clientesFiltrados = [];

    this.esperaInterval = setInterval(() => {
      this.tiempoEspera++;
      if (this.tiempoEspera >= 5 && !this.timeoutWarning && this.cargando) {
        this.timeoutWarning = true;
      }
    }, 1000);

    this.timeoutId = setTimeout(() => {
      if (this.cargando) {
        this.cargando = false;
        this.error = 'La carga de datos está tomando demasiado tiempo.';
        if (this.esperaInterval) clearInterval(this.esperaInterval);
      }
    }, 15000);

    this.cargarTodosLosClientes();
  }

  cancelarCarga(): void {
    if (this.cargando) {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.subscriptions = [];
      this.cargando = false;
      this.error = 'Carga cancelada por el usuario.';
      if (this.timeoutId) clearTimeout(this.timeoutId);
      if (this.esperaInterval) clearInterval(this.esperaInterval);
    }
  }

  cargarTodosLosClientes(): void {
    let peticionesCompletadas = 0;
    const totalPeticiones = 3;

    const verificarFinalizacion = () => {
      peticionesCompletadas++;
      if (peticionesCompletadas === totalPeticiones) {
        clearTimeout(this.timeoutId);
        clearInterval(this.esperaInterval);
        this.cargando = false;
        this.aplicarFiltro();
        if (this.clientes.length === 0 && !this.error) {
          this.error = 'No hay clientes registrados en el sistema.';
        }
      }
    };

    const manejarError = (tipo: string, err: any) => {
      console.error(`❌ Error cargando ${tipo}:`, err);
      verificarFinalizacion();
    };

    // Petición Clientes Normales
    const normalSub = this.clienteNormalService.getClientesNormales()
      .pipe(timeout(8000), catchError(err => { manejarError('normales', err); return of(null); }))
      .subscribe({
        next: (resp) => {
          if (resp?.body) {
            const data = resp.body.map(c => ({ ...c, tipo: 'Normal' as const, metodoPago: c.metodoPago || 'N/A' }));
            this.clientes.push(...data);
          }
          verificarFinalizacion();
        }
      });
    this.subscriptions.push(normalSub);

    // Petición Clientes Concurrentes
    const concurrenteSub = this.clienteConcurrenteService.getClientesConcurrentes()
      .pipe(timeout(8000), catchError(err => { manejarError('concurrentes', err); return of(null); }))
      .subscribe({
        next: (resp) => {
          if (resp?.body) {
            const data = resp.body.map(c => ({ ...c, tipo: 'Concurrente' as const, metodoPago: c.metodoPago || 'N/A' }));
            this.clientes.push(...data);
          }
          verificarFinalizacion();
        }
      });
    this.subscriptions.push(concurrenteSub);

    // Petición Clientes Premium
    const premiumSub = this.clientePremiumService.getClientesPremium()
      .pipe(timeout(8000), catchError(err => { manejarError('premium', err); return of(null); }))
      .subscribe({
        next: (resp) => {
          if (resp?.body) {
            const data = resp.body.map(c => ({ ...c, tipo: 'Premium' as const, metodoPago: c.metodoPago || 'N/A' }));
            this.clientes.push(...data);
          }
          verificarFinalizacion();
        }
      });
    this.subscriptions.push(premiumSub);
  }

  // --- ACCIONES ---
  eliminarCliente(cliente: ClienteUnificado): void {
    if (!confirm(`¿Estás seguro de eliminar a ${cliente.nombre}?`)) return;

    const clienteEliminado = { ...cliente };
    let eliminar$;

    if (cliente.tipo === 'Normal') eliminar$ = this.clienteNormalService.eliminarClienteNormal(cliente.id);
    else if (cliente.tipo === 'Concurrente') eliminar$ = this.clienteConcurrenteService.eliminarClienteConcurrente(cliente.id);
    else eliminar$ = this.clientePremiumService.eliminarClientePremium(cliente.id);

    this.cargando = true;
    const sub = eliminar$.subscribe({
      next: () => {
        const index = this.clientes.findIndex(c => c.tipo === clienteEliminado.tipo && c.id === clienteEliminado.id);
        if (index !== -1) {
          this.clientes.splice(index, 1);
          this.aplicarFiltro();
        }
        this.mensajeExito = `✅ ${clienteEliminado.nombre} eliminado correctamente`;
        this.cargando = false;
        setTimeout(() => this.mensajeExito = '', 3000);
      },
      error: (err) => {
        this.cargando = false;
        this.error = `Error al eliminar: ${err.message}`;
        alert(this.error);
      }
    });
    this.subscriptions.push(sub);
  }

  // --- UTILIDADES ---
  aplicarFiltro(): void {
    this.clientesFiltrados = this.filtroActual === 'Todos'
      ? [...this.clientes]
      : this.clientes.filter(c => c.tipo === this.filtroActual);
  }

  onFiltroChange(event: Event): void {
    this.filtroActual = (event.target as HTMLSelectElement).value;
    this.aplicarFiltro();
  }

  toggleHistorial(clienteKey: string): void {
    this.historialVisible[clienteKey] = !this.historialVisible[clienteKey];
  }

  getIniciales(nombre: string): string {
    return nombre ? nombre.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase() : '??';
  }

  getClienteKey(cliente: ClienteUnificado): string {
    return `${cliente.tipo}-${cliente.id}`;
  }

  actualizarCliente(cliente: ClienteUnificado): void {
    alert(`Actualización para ${cliente.nombre} - Próximamente`);
  }
}
