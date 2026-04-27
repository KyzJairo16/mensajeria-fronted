import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router'; // Importado para navegación
import { AdministradorService } from '../services/administrador.service';
import { ConductorService } from '../services/conductor.service';
import { ManipuladordepaqueteService } from '../services/manipuladordepaquete.service';
import { AdministradorModel } from '../models/administrador.model';
import { ConductorModel } from '../models/conductor.model';
import { ManipuladordepaqueteModel } from '../models/manipuladordepaquete.model';
import { Subscription, timeout, catchError, of } from 'rxjs';

interface TrabajadorUnificado {
  id: number;
  nombre: string;
  cedula: string;
  correo: string;
  telefono: string;
  turno: string;
  tipo: 'Administrador' | 'Conductor' | 'Manipulador';
  usuario?: string;
  contrasenia?: string;
  placaVehiculo?: string;
  tipoManipulador?: string;
}

@Component({
  selector: 'app-gestortrabajador',
  standalone: false,
  templateUrl: './gestortrabajador.html',
  styleUrl: './gestortrabajador.css',
})
export class Gestortrabajador implements OnInit, OnDestroy {

  private administradorService = inject(AdministradorService);
  private conductorService = inject(ConductorService);
  private manipuladorService = inject(ManipuladordepaqueteService);
  private router = inject(Router); // Inyectado para el botón volver

  trabajadores: TrabajadorUnificado[] = [];
  trabajadoresFiltrados: TrabajadorUnificado[] = [];
  filtroActual: string = 'Todos';
  cargando: boolean = false;
  error: string = '';
  timeoutWarning: boolean = false;
  tiempoEspera: number = 0;
  mensajeExito: string = '';

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

  // MÉTODO PARA NAVEGACIÓN
  volverAlMenu(): void {
    this.router.navigate(['/administrador']);
  }

  recargarTrabajadores(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.esperaInterval) clearInterval(this.esperaInterval);

    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];

    this.cargando = true;
    this.error = '';
    this.mensajeExito = '';
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

    console.log(' Recargando trabajadores...');
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
      console.log(`Peticiones completadas: ${peticionesCompletadas}/${totalPeticiones}`);

      if (peticionesCompletadas === totalPeticiones) {
        clearTimeout(this.timeoutId);
        clearInterval(this.esperaInterval);
        this.cargando = false;
        console.log('Total trabajadores cargados:', this.trabajadores.length);
        this.aplicarFiltro();

        if (this.trabajadores.length === 0 && !this.error) {
          this.error = 'No hay trabajadores registrados en el sistema.';
        }
      }
    };

    const manejarError = (tipo: string, err: any) => {
      console.error(`Error cargando ${tipo}:`, err.message || err);
      verificarFinalizacion();
    };

    // Cargar Administradores
    const adminSub = this.administradorService.getAdministradores()
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
            const administradores: TrabajadorUnificado[] = resp.body.map((a: any) => ({
              id: a.id || a.idAdministrador,
              nombre: a.nombre || a.nombreAdministrador,
              cedula: a.cedula || a.cedulaAdministrador,
              correo: a.correo || a.correoAdministrador,
              telefono: a.telefono || a.telefonoAdministrador,
              turno: a.turno,
              tipo: 'Administrador' as const,
              usuario: a.usuario,
              contrasenia: a.contrasenia
            }));
            console.log('Administradores mapeados:', administradores.length);
            this.trabajadores.push(...administradores);
          } else {
            console.log('No hay administradores registrados');
          }
          verificarFinalizacion();
        },
        error: () => verificarFinalizacion()
      });
    this.subscriptions.push(adminSub);

    // Cargar Conductores
    const conductorSub = this.conductorService.getConductores()
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
            const conductores: TrabajadorUnificado[] = resp.body.map((c: any) => ({
              id: c.id || c.idConductor,
              nombre: c.nombre || c.nombreConductor,
              cedula: c.cedula || c.cedulaConductor,
              correo: c.correo || c.correoConductor,
              telefono: c.telefono || c.telefonoConductor,
              turno: c.turno,
              tipo: 'Conductor' as const,
              placaVehiculo: c.placaVehiculo
            }));
            console.log('Conductores mapeados:', conductores.length);
            this.trabajadores.push(...conductores);
          } else {
            console.log('No hay conductores registrados');
          }
          verificarFinalizacion();
        },
        error: () => verificarFinalizacion()
      });
    this.subscriptions.push(conductorSub);

    // Cargar Manipuladores
    const manipuladorSub = this.manipuladorService.getManipuladores()
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
            const manipuladores: TrabajadorUnificado[] = resp.body.map((m: any) => ({
              id: m.id || m.idManipulador,
              nombre: m.nombre || m.nombreManipulador,
              cedula: m.cedula || m.cedulaManipulador,
              correo: m.correo || m.correoManipulador,
              telefono: m.telefono || m.telefonoManipulador,
              turno: m.turno,
              tipo: 'Manipulador' as const,
              tipoManipulador: m.tipoManipulador
            }));
            console.log('Manipuladores mapeados:', manipuladores.length);
            this.trabajadores.push(...manipuladores);
          } else {
            console.log('No hay manipuladores registrados');
          }
          verificarFinalizacion();
        },
        error: () => verificarFinalizacion()
      });
    this.subscriptions.push(manipuladorSub);
  }

  aplicarFiltro(): void {
    if (this.filtroActual === 'Todos') {
      this.trabajadoresFiltrados = [...this.trabajadores];
    } else {
      this.trabajadoresFiltrados = this.trabajadores.filter((t: TrabajadorUnificado) => t.tipo === this.filtroActual);
    }
    console.log(`Filtro: ${this.filtroActual} -> ${this.trabajadoresFiltrados.length} trabajadores`);
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

  getTipoClase(tipo: string): string {
    switch (tipo) {
      case 'Administrador': return 'administrador';
      case 'Conductor': return 'conductor';
      case 'Manipulador': return 'manipulador';
      default: return '';
    }
  }

  getIcono(tipo: string): string {
    switch (tipo) {
      case 'Administrador': return 'fa-user-shield';
      case 'Conductor': return 'fa-truck';
      case 'Manipulador': return 'fa-boxes';
      default: return 'fa-user';
    }
  }

  getTipoTexto(tipo: string): string {
    switch (tipo) {
      case 'Administrador': return 'Administrador';
      case 'Conductor': return 'Conductor';
      case 'Manipulador': return 'Manipulador de Paquete';
      default: return tipo;
    }
  }

  actualizarTrabajador(trabajador: TrabajadorUnificado) {
    this.router.navigate(['/admin/actualizar', 'trabajador', trabajador.tipo, trabajador.id]);
  }

  eliminarTrabajador(trabajador: TrabajadorUnificado): void {
    if (!confirm(`¿Estás seguro de eliminar a ${trabajador.nombre}?`)) return;

    const trabajadorEliminado = { ...trabajador };

    let eliminar$;
    if (trabajador.tipo === 'Administrador') {
      eliminar$ = this.administradorService.eliminarAdministrador(trabajador.id);
    } else if (trabajador.tipo === 'Conductor') {
      eliminar$ = this.conductorService.eliminarConductor(trabajador.id);
    } else {
      eliminar$ = this.manipuladorService.eliminarManipulador(trabajador.id);
    }

    this.cargando = true;

    const sub = eliminar$.subscribe({
      next: (respuesta: any) => {
        console.log(`Trabajador ${trabajadorEliminado.tipo} eliminado:`, respuesta);

        const index = this.trabajadores.findIndex(t =>
          t.tipo === trabajadorEliminado.tipo && t.id === trabajadorEliminado.id
        );

        if (index !== -1) {
          this.trabajadores.splice(index, 1);
          this.aplicarFiltro();
          console.log(`Trabajador eliminado de la lista local. Total restante: ${this.trabajadores.length}`);
        }

        this.mensajeExito = `${trabajadorEliminado.nombre} eliminado correctamente`;
        this.cargando = false;
        this.error = '';

        setTimeout(() => {
          if (this.mensajeExito === `${trabajadorEliminado.nombre} eliminado correctamente`) {
            this.mensajeExito = '';
          }
        }, 3000);
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        this.cargando = false;
        this.error = `Error al eliminar ${trabajadorEliminado.nombre}: ${err.error || err.message}`;
        alert(this.error);
      }
    });

    this.subscriptions.push(sub);
  }
}
