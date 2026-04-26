// gestortrabajador.ts - VERSIÓN CON RECARGA Y TIMEOUT PARA TRABAJADORES
import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ConductorService } from '../services/conductor.service';
import { ManipuladordepaqueteService } from '../services/manipuladordepaquete.service';
import { AdministradorService } from '../services/administrador.service';
import { ConductorModel } from '../models/conductor.model';
import { ManipuladordepaqueteModel } from '../models/manipuladordepaquete.model';
import { AdministradorModel } from '../models/administrador.model';
import { Subscription, timeout, catchError, of } from 'rxjs';

interface TrabajadorUnificado {
  id: number;
  nombre: string;
  cedula: string;
  correo: string;
  telefono: string;
  tipo: 'Conductor' | 'Manipulador' | 'Administrativo';
  turno: string;
  // Campos específicos
  placaVehiculo?: string;
  tipoManipulador?: string;
  usuario?: string;
  area?: string;
}

@Component({
  selector: 'app-gestortrabajador',
  standalone: false,
  templateUrl: './gestortrabajador.html',
  styleUrl: './gestortrabajador.css',
})
export class Gestortrabajador implements OnInit, OnDestroy {

  private conductorService = inject(ConductorService);
  private manipuladorService = inject(ManipuladordepaqueteService);
  private administradorService = inject(AdministradorService);

  trabajadores: TrabajadorUnificado[] = [];
  trabajadoresFiltrados: TrabajadorUnificado[] = [];
  filtroActual: string = 'Todos';
  cargando: boolean = false;
  error: string = '';
  timeoutWarning: boolean = false;
  tiempoEspera: number = 0;

  private subscriptions: Subscription[] = [];
  private timeoutId: any;
  private esperaInterval: any;

  ngOnInit(): void {
    this.recargarTrabajadores();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.esperaInterval) clearInterval(this.esperaInterval);
  }

  recargarTrabajadores(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.esperaInterval) clearInterval(this.esperaInterval);

    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];

    this.cargando = true;
    this.error = '';
    this.timeoutWarning = false;
    this.tiempoEspera = 0;
    this.trabajadores = [];
    this.trabajadoresFiltrados = [];

    this.esperaInterval = setInterval(() => {
      this.tiempoEspera++;
      if (this.tiempoEspera >= 5 && !this.timeoutWarning && this.cargando) {
        this.timeoutWarning = true;
      }
    }, 1000);

    this.timeoutId = setTimeout(() => {
      if (this.cargando) {
        this.cargando = false;
        this.error = 'La carga de datos está tomando demasiado tiempo. Verifica tu conexión o recarga manualmente.';
        if (this.esperaInterval) clearInterval(this.esperaInterval);
      }
    }, 15000);

    console.log('🔄 Recargando trabajadores...');
    this.cargarTodosLosTrabajadores();
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

  cargarTodosLosTrabajadores(): void {
    let peticionesCompletadas = 0;
    const totalPeticiones = 3;

    const verificarFinalizacion = () => {
      peticionesCompletadas++;
      console.log(`📊 Peticiones completadas: ${peticionesCompletadas}/${totalPeticiones}`);

      if (peticionesCompletadas === totalPeticiones) {
        clearTimeout(this.timeoutId);
        clearInterval(this.esperaInterval);
        this.cargando = false;
        console.log('🟢 Total trabajadores cargados:', this.trabajadores.length);
        console.table(this.trabajadores);
        this.aplicarFiltro();

        if (this.trabajadores.length === 0 && !this.error) {
          this.error = 'No hay trabajadores registrados en el sistema.';
        }
      }
    };

    const manejarError = (tipo: string, err: any) => {
      console.error(`❌ Error cargando ${tipo}:`, err.message || err);
      verificarFinalizacion();
    };

    // Cargar Conductores
    const conductoresSub = this.conductorService.getConductores()
      .pipe(
        timeout(8000),
        catchError(err => {
          manejarError('conductores', err);
          return of(null);
        })
      )
      .subscribe({
        next: (resp: HttpResponse<ConductorModel[]> | null) => {
          if (resp && resp.body && Array.isArray(resp.body) && resp.body.length > 0) {
            const conductores: TrabajadorUnificado[] = resp.body.map((c: ConductorModel) => ({
              id: c.id,
              nombre: c.nombre,
              cedula: c.cedula,
              correo: c.correo,
              telefono: c.telefono,
              tipo: 'Conductor' as const,
              turno: c.turno,
              placaVehiculo: c.placaVehiculo
            }));
            console.log('✅ Conductores mapeados:', conductores.length);
            this.trabajadores.push(...conductores);
          } else {
            console.log('ℹ️ No hay conductores registrados');
          }
          verificarFinalizacion();
        },
        error: () => verificarFinalizacion()
      });
    this.subscriptions.push(conductoresSub);

    // Cargar Manipuladores
    const manipuladoresSub = this.manipuladorService.getManipuladores()
      .pipe(
        timeout(8000),
        catchError(err => {
          manejarError('manipuladores', err);
          return of(null);
        })
      )
      .subscribe({
        next: (resp: HttpResponse<ManipuladordepaqueteModel[]> | null) => {
          if (resp && resp.body && Array.isArray(resp.body) && resp.body.length > 0) {
            const manipuladores: TrabajadorUnificado[] = resp.body.map((m: ManipuladordepaqueteModel) => ({
              id: m.id,
              nombre: m.nombre,
              cedula: m.cedula,
              correo: m.correo,
              telefono: m.telefono,
              tipo: 'Manipulador' as const,
              turno: m.turno,
              tipoManipulador: m.tipoManipulador
            }));
            console.log('✅ Manipuladores mapeados:', manipuladores.length);
            this.trabajadores.push(...manipuladores);
          } else {
            console.log('ℹ️ No hay manipuladores registrados');
          }
          verificarFinalizacion();
        },
        error: () => verificarFinalizacion()
      });
    this.subscriptions.push(manipuladoresSub);

    // Cargar Administradores
    const administradoresSub = this.administradorService.getAdministradores()
      .pipe(
        timeout(8000),
        catchError(err => {
          manejarError('administradores', err);
          return of(null);
        })
      )
      .subscribe({
        next: (resp: HttpResponse<AdministradorModel[]> | null) => {
          if (resp && resp.body && Array.isArray(resp.body) && resp.body.length > 0) {
            const administrativos: TrabajadorUnificado[] = resp.body.map((a: AdministradorModel) => ({
              id: 0, // Los administradores pueden no tener ID en el modelo
              nombre: a.usuario || 'Administrador',
              cedula: '',
              correo: '',
              telefono: '',
              tipo: 'Administrativo' as const,
              turno: 'Completo',
              usuario: a.usuario,
              area: 'Gestión'
            }));
            console.log('✅ Administradores mapeados:', administrativos.length);
            this.trabajadores.push(...administrativos);
          } else {
            console.log('ℹ️ No hay administradores registrados');
          }
          verificarFinalizacion();
        },
        error: () => verificarFinalizacion()
      });
    this.subscriptions.push(administradoresSub);
  }

  actualizarTrabajador(trabajador: TrabajadorUnificado): void {
    console.log('📝 Actualizar trabajador:', trabajador);
    alert(`Función de actualización para ${trabajador.nombre} - Próximamente implementada`);
  }

  aplicarFiltro(): void {
    if (this.filtroActual === 'Todos') {
      this.trabajadoresFiltrados = [...this.trabajadores];
    } else {
      this.trabajadoresFiltrados = this.trabajadores.filter(
        (t: TrabajadorUnificado) => t.tipo === this.filtroActual
      );
    }
    console.log(`🔍 Filtro: ${this.filtroActual} -> ${this.trabajadoresFiltrados.length} trabajadores`);
  }

  onFiltroChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.filtroActual = select.value;
    this.aplicarFiltro();
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

  eliminarTrabajador(trabajador: TrabajadorUnificado): void {
    if (!confirm(`¿Eliminar a ${trabajador.nombre}?`)) return;

    let eliminar$;
    if (trabajador.tipo === 'Conductor') {
      eliminar$ = this.conductorService.eliminarConductor(trabajador.id);
    } else if (trabajador.tipo === 'Manipulador') {
      eliminar$ = this.manipuladorService.eliminarManipulador(trabajador.id);
    } else {
      alert('No se puede eliminar administradores desde esta interfaz');
      return;
    }

    const sub = eliminar$.subscribe({
      next: () => {
        console.log(`Trabajador ${trabajador.tipo} eliminado`);
        this.recargarTrabajadores();
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Error al eliminar trabajador');
      }
    });
    this.subscriptions.push(sub);
  }

  // Método auxiliar para obtener badge de tipo de trabajador
  getTipoBadge(tipo: string): string {
    switch(tipo) {
      case 'Conductor': return 'conductor';
      case 'Manipulador': return 'manipulador';
      case 'Administrativo': return 'admin';
      default: return '';
    }
  }

  // Método auxiliar para obtener ícono del tipo de trabajador
  getTipoIcono(tipo: string): string {
    switch(tipo) {
      case 'Conductor': return 'fa-truck';
      case 'Manipulador': return 'fa-box';
      case 'Administrativo': return 'fa-user-shield';
      default: return 'fa-user';
    }
  }

  // Método auxiliar para obtener detalle específico según tipo
  getDetalleEspecifico(trabajador: TrabajadorUnificado): { icono: string; texto: string } {
    switch(trabajador.tipo) {
      case 'Conductor':
        return { icono: 'fa-id-badge', texto: `Licencia: ${trabajador.placaVehiculo || 'N/A'}` };
      case 'Manipulador':
        return { icono: 'fa-warehouse', texto: `Tipo: ${trabajador.tipoManipulador || 'N/A'}` };
      case 'Administrativo':
        return { icono: 'fa-building', texto: `Área: ${trabajador.area || 'Gestión'}` };
      default:
        return { icono: 'fa-info-circle', texto: 'Sin información adicional' };
    }
  }
}
