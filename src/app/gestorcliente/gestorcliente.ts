// gestorcliente.ts - VERSIÓN CORREGIDA (ELIMINACIÓN FUNCIONAL)
import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ClientenormalService } from '../services/clientenormal.service';
import { ClienteconcurrenteService } from '../services/clienteconcurrente.service';
import { ClientepremiumService } from '../services/clientepremium.service';
import { ClientenormalModel } from '../models/clientenormal.model';
import { ClienteconcurrenteModel } from '../models/clienteconcurrente.model';
import { ClientepremiumModel } from '../models/clientepremium.model';
import { Subscription, timeout, catchError, of, finalize } from 'rxjs';

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

  private clienteNormalService = inject(ClientenormalService);
  private clienteConcurrenteService = inject(ClienteconcurrenteService);
  private clientePremiumService = inject(ClientepremiumService);

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
    // Limpiar todas las suscripciones
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.esperaInterval) clearInterval(this.esperaInterval);
  }

  recargarClientes(): void {
    // Limpiar tiempo de espera anterior
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.esperaInterval) clearInterval(this.esperaInterval);

    // Limpiar suscripciones anteriores
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];

    // Reiniciar estados
    this.cargando = true;
    this.error = '';
    this.mensajeExito = '';
    this.timeoutWarning = false;
    this.tiempoEspera = 0;
    this.clientes = [];
    this.clientesFiltrados = [];

    // Iniciar contador de espera
    this.esperaInterval = setInterval(() => {
      this.tiempoEspera++;
      if (this.tiempoEspera >= 5 && !this.timeoutWarning && this.cargando) {
        this.timeoutWarning = true;
      }
    }, 1000);

    // Timeout global de 15 segundos
    this.timeoutId = setTimeout(() => {
      if (this.cargando) {
        this.cargando = false;
        this.error = 'La carga de datos está tomando demasiado tiempo. Verifica tu conexión o recarga manualmente.';
        if (this.esperaInterval) clearInterval(this.esperaInterval);
      }
    }, 15000);

    console.log('🔄 Recargando clientes...');
    this.cargarTodosLosClientes();
  }

  cancelarCarga(): void {
    if (this.cargando) {
      // Cancelar todas las suscripciones
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.subscriptions = [];
      this.cargando = false;
      this.error = 'Carga cancelada por el usuario.';
      if (this.timeoutId) clearTimeout(this.timeoutId);
      if (this.esperaInterval) clearInterval(this.esperaInterval);
    }
  }

  cargarTodosLosClientes(): void {
    // Contador de peticiones completadas
    let peticionesCompletadas = 0;
    const totalPeticiones = 3;

    const verificarFinalizacion = () => {
      peticionesCompletadas++;
      console.log(`📊 Peticiones completadas: ${peticionesCompletadas}/${totalPeticiones}`);

      if (peticionesCompletadas === totalPeticiones) {
        clearTimeout(this.timeoutId);
        clearInterval(this.esperaInterval);
        this.cargando = false;
        console.log('🟢 Total clientes cargados:', this.clientes.length);
        console.table(this.clientes);
        this.aplicarFiltro();

        if (this.clientes.length === 0 && !this.error) {
          this.error = 'No hay clientes registrados en el sistema.';
        }
      }
    };

    // Función para manejar errores individuales
    const manejarError = (tipo: string, err: any) => {
      console.error(`❌ Error cargando clientes ${tipo}:`, err.message || err);
      verificarFinalizacion();
    };

    // Cargar clientes normales con timeout
    const normalSub = this.clienteNormalService.getClientesNormales()
      .pipe(
        timeout(8000),
        catchError(err => {
          manejarError('normales', err);
          return of(null);
        })
      )
      .subscribe({
        next: (resp: HttpResponse<ClientenormalModel[]> | null) => {
          if (resp && resp.body && Array.isArray(resp.body) && resp.body.length > 0) {
            const normales: ClienteUnificado[] = resp.body.map((c: ClientenormalModel) => ({
              id: c.id,
              nombre: c.nombre,
              cedula: c.cedula,
              correo: c.correo,
              telefono: c.telefono,
              tipo: 'Normal' as const,
              metodoPago: c.metodoPago || 'No especificado'
            }));
            console.log('✅ Clientes Normales mapeados:', normales.length);
            this.clientes.push(...normales);
          } else {
            console.log('ℹ️ No hay clientes normales registrados');
          }
          verificarFinalizacion();
        },
        error: () => verificarFinalizacion()
      });
    this.subscriptions.push(normalSub);

    // Cargar clientes concurrentes con timeout
    const concurrenteSub = this.clienteConcurrenteService.getClientesConcurrentes()
      .pipe(
        timeout(8000),
        catchError(err => {
          manejarError('concurrentes', err);
          return of(null);
        })
      )
      .subscribe({
        next: (resp: HttpResponse<ClienteconcurrenteModel[]> | null) => {
          if (resp && resp.body && Array.isArray(resp.body) && resp.body.length > 0) {
            const concurrentes: ClienteUnificado[] = resp.body.map((c: ClienteconcurrenteModel) => ({
              id: c.id,
              nombre: c.nombre,
              cedula: c.cedula,
              correo: c.correo,
              telefono: c.telefono,
              tipo: 'Concurrente' as const,
              metodoPago: c.metodoPago || 'No especificado'
            }));
            console.log('✅ Clientes Concurrentes mapeados:', concurrentes.length);
            this.clientes.push(...concurrentes);
          } else {
            console.log('ℹ️ No hay clientes concurrentes registrados');
          }
          verificarFinalizacion();
        },
        error: () => verificarFinalizacion()
      });
    this.subscriptions.push(concurrenteSub);

    // Cargar clientes premium con timeout
    const premiumSub = this.clientePremiumService.getClientesPremium()
      .pipe(
        timeout(8000),
        catchError(err => {
          manejarError('premium', err);
          return of(null);
        })
      )
      .subscribe({
        next: (resp: HttpResponse<ClientepremiumModel[]> | null) => {
          if (resp && resp.body && Array.isArray(resp.body) && resp.body.length > 0) {
            const premium: ClienteUnificado[] = resp.body.map((c: ClientepremiumModel) => ({
              id: c.id,
              nombre: c.nombre,
              cedula: c.cedula,
              correo: c.correo,
              telefono: c.telefono,
              tipo: 'Premium' as const,
              metodoPago: c.metodoPago || 'No especificado'
            }));
            console.log('✅ Clientes Premium mapeados:', premium.length);
            this.clientes.push(...premium);
          } else {
            console.log('ℹ️ No hay clientes premium registrados');
          }
          verificarFinalizacion();
        },
        error: () => verificarFinalizacion()
      });
    this.subscriptions.push(premiumSub);
  }

  actualizarCliente(cliente: ClienteUnificado): void {
    console.log('📝 Actualizar cliente:', cliente);
    alert(`Función de actualización para ${cliente.nombre} - Próximamente implementada`);
  }

  aplicarFiltro(): void {
    if (this.filtroActual === 'Todos') {
      this.clientesFiltrados = [...this.clientes];
    } else {
      this.clientesFiltrados = this.clientes.filter((c: ClienteUnificado) => c.tipo === this.filtroActual);
    }
    console.log(`🔍 Filtro: ${this.filtroActual} -> ${this.clientesFiltrados.length} clientes`);
  }

  onFiltroChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.filtroActual = select.value;
    this.aplicarFiltro();
  }

  toggleHistorial(clienteKey: string): void {
    this.historialVisible[clienteKey] = !this.historialVisible[clienteKey];
  }

  getIniciales(nombre: string): string {
    if (!nombre) return '??';
    return nombre
      .split(' ')
      .slice(0, 2)
      .map((n: string) => n[0])
      .join('')
      .toUpperCase();
  }

  getClienteKey(cliente: ClienteUnificado): string {
    return `${cliente.tipo}-${cliente.id}`;
  }

  // ==================== FUNCIÓN ELIMINAR CORREGIDA ====================
  eliminarCliente(cliente: ClienteUnificado): void {
    if (!confirm(`¿Estás seguro de eliminar a ${cliente.nombre}?`)) return;

    // Guardar referencia para usar después
    const clienteEliminado = { ...cliente };

    let eliminar$;
    if (cliente.tipo === 'Normal') {
      eliminar$ = this.clienteNormalService.eliminarClienteNormal(cliente.id);
    } else if (cliente.tipo === 'Concurrente') {
      eliminar$ = this.clienteConcurrenteService.eliminarClienteConcurrente(cliente.id);
    } else {
      eliminar$ = this.clientePremiumService.eliminarClientePremium(cliente.id);
    }

    // Mostrar loading en el botón específico (opcional)
    this.cargando = true;

    const sub = eliminar$.subscribe({
      next: (respuesta: any) => {
        console.log(`✅ Cliente ${clienteEliminado.tipo} eliminado:`, respuesta);

        // ELIMINAR LOCALMENTE - Actualización inmediata
        const index = this.clientes.findIndex(c =>
          c.tipo === clienteEliminado.tipo && c.id === clienteEliminado.id
        );

        if (index !== -1) {
          this.clientes.splice(index, 1);
          this.aplicarFiltro(); // Actualizar vista filtrada
          console.log(`🗑️ Cliente eliminado de la lista local. Total restante: ${this.clientes.length}`);
        }

        // Mostrar mensaje de éxito
        this.mensajeExito = `✅ ${clienteEliminado.nombre} eliminado correctamente`;
        this.cargando = false;
        this.error = '';

        // Ocultar mensaje después de 3 segundos
        setTimeout(() => {
          if (this.mensajeExito === ` ${clienteEliminado.nombre} eliminado correctamente`) {
            this.mensajeExito = '';
          }
        }, 3000);
      },
      error: (err) => {
        console.error('❌ Error al eliminar:', err);
        this.cargando = false;
        this.error = `Error al eliminar ${clienteEliminado.nombre}: ${err.error || err.message}`;
        alert(this.error);
      }
    });

    this.subscriptions.push(sub);
  }
  // ==================== FIN FUNCIÓN ELIMINAR ====================
}
