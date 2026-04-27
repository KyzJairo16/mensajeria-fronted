import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router'; // Importado para el botón volver
import { PaquetealimenticioService } from '../services/paquetealimenticio.service';
import { PaquetenoalimenticioService } from '../services/paquetenoalimenticio.service';
import { PaquetecartaService } from '../services/paquetecarta.service';
import { PaquetealimenticioModel } from '../models/paquetealimenticio.model';
import { PaquetenoalimenticioModel } from '../models/paquetenoalimenticio.model';
import { PaquetecartaModel } from '../models/paquetecarta.model';
import { Subscription, timeout, catchError, of } from 'rxjs';

interface PaqueteUnificado {
  id: number;
  precioEnvio: number;
  direccionDestino: string;
  tamanio: string;
  fechaCreacionPedido: Date;
  fechaEstimadaEntrega: Date;
  ciudadDestino: string;
  estadoPedido: string;
  esPrioritario: boolean;
  precioFinal: number;
  idCliente: number;
  tipo: 'Alimenticio' | 'NoAlimenticio' | 'Carta';
  tipoDeAlimento?: string;
  seEnviaHoy?: boolean;
  esFragil?: boolean;
  tipoCarta?: string;
}

@Component({
  selector: 'app-gestorpaquete',
  standalone: false,
  templateUrl: './gestorpaquete.html',
  styleUrl: './gestorpaquete.css',
})
export class Gestorpaquete implements OnInit, OnDestroy {

  private paqueteAlimenticioService = inject(PaquetealimenticioService);
  private paqueteNoAlimenticioService = inject(PaquetenoalimenticioService);
  private paqueteCartaService = inject(PaquetecartaService);
  private router = inject(Router); // Inyectado para navegación

  paquetes: PaqueteUnificado[] = [];
  paquetesFiltrados: PaqueteUnificado[] = [];
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
    this.recargarPaquetes();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.esperaInterval) clearInterval(this.esperaInterval);
  }


  volverAlMenu(): void {
    this.router.navigate(['/administrador']);
  }

  recargarPaquetes(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.esperaInterval) clearInterval(this.esperaInterval);

    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];

    this.cargando = true;
    this.error = '';
    this.mensajeExito = '';
    this.timeoutWarning = false;
    this.tiempoEspera = 0;
    this.paquetes = [];
    this.paquetesFiltrados = [];

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

    console.log(' Recargando paquetes...');
    this.cargarTodosLosPaquetes();
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

  cargarTodosLosPaquetes(): void {
    let peticionesCompletadas = 0;
    const totalPeticiones = 3;

    const verificarFinalizacion = () => {
      peticionesCompletadas++;
      console.log(` Peticiones completadas: ${peticionesCompletadas}/${totalPeticiones}`);

      if (peticionesCompletadas === totalPeticiones) {
        clearTimeout(this.timeoutId);
        clearInterval(this.esperaInterval);
        this.cargando = false;
        console.log(' Total paquetes cargados:', this.paquetes.length);
        this.aplicarFiltro();

        if (this.paquetes.length === 0 && !this.error) {
          this.error = 'No hay paquetes registrados en el sistema.';
        }
      }
    };

    const manejarError = (tipo: string, err: any) => {
      console.error(` Error cargando paquetes ${tipo}:`, err.message || err);
      verificarFinalizacion();
    };

    // Cargar paquetes alimenticios
    const alimenticioSub = this.paqueteAlimenticioService.getPaquetesAlimenticios()
      .pipe(
        timeout(8000),
        catchError(err => {
          manejarError('alimenticios', err);
          return of(null);
        })
      )
      .subscribe({
        next: (resp: HttpResponse<PaquetealimenticioModel[]> | null) => {
          if (resp && resp.body && Array.isArray(resp.body) && resp.body.length > 0) {
            const alimenticios: PaqueteUnificado[] = resp.body.map((p: any) => ({
              id: p.id,
              precioEnvio: p.precioEnvio,
              direccionDestino: p.direccionDestino,
              tamanio: p.tamanio,
              fechaCreacionPedido: new Date(p.fechaCreacionPedido),
              fechaEstimadaEntrega: new Date(p.fechaEstimadaEntrega),
              ciudadDestino: p.ciudadDestino,
              estadoPedido: p.estadoPedido,
              esPrioritario: p.esPrioritario,
              precioFinal: p.precioFinal,
              idCliente: p.idCliente,
              tipo: 'Alimenticio',
              tipoDeAlimento: p.tipoDeAlimento,
              seEnviaHoy: p.seEnviaHoy
            }));
            console.log(' Paquetes Alimenticios mapeados:', alimenticios.length);
            this.paquetes.push(...alimenticios);
          } else {
            console.log(' No hay paquetes alimenticios registrados');
          }
          verificarFinalizacion();
        },
        error: () => verificarFinalizacion()
      });
    this.subscriptions.push(alimenticioSub);


    const noAlimenticioSub = this.paqueteNoAlimenticioService.getPaquetesNoAlimenticios()
      .pipe(
        timeout(8000),
        catchError(err => {
          manejarError('no alimenticios', err);
          return of(null);
        })
      )
      .subscribe({
        next: (resp: HttpResponse<PaquetenoalimenticioModel[]> | null) => {
          if (resp && resp.body && Array.isArray(resp.body) && resp.body.length > 0) {
            const noAlimenticios: PaqueteUnificado[] = resp.body.map((p: any) => ({
              id: p.id,
              precioEnvio: p.precioEnvio,
              direccionDestino: p.direccionDestino,
              tamanio: p.tamanio,
              fechaCreacionPedido: new Date(p.fechaCreacionPedido),
              fechaEstimadaEntrega: new Date(p.fechaEstimadaEntrega),
              ciudadDestino: p.ciudadDestino,
              estadoPedido: p.estadoPedido,
              esPrioritario: p.esPrioritario,
              precioFinal: p.precioFinal,
              idCliente: p.idCliente,
              tipo: 'NoAlimenticio',
              esFragil: p.esFragil
            }));
            console.log(' Paquetes No Alimenticios mapeados:', noAlimenticios.length);
            this.paquetes.push(...noAlimenticios);
          } else {
            console.log(' No hay paquetes no alimenticios registrados');
          }
          verificarFinalizacion();
        },
        error: () => verificarFinalizacion()
      });
    this.subscriptions.push(noAlimenticioSub);


    const cartaSub = this.paqueteCartaService.getPaquetesCartas()
      .pipe(
        timeout(8000),
        catchError(err => {
          manejarError('carta', err);
          return of(null);
        })
      )
      .subscribe({
        next: (resp: HttpResponse<PaquetecartaModel[]> | null) => {
          if (resp && resp.body && Array.isArray(resp.body) && resp.body.length > 0) {
            const cartas: PaqueteUnificado[] = resp.body.map((p: any) => ({
              id: p.id,
              precioEnvio: p.precioEnvio,
              direccionDestino: p.direccionDestino,
              tamanio: p.tamanio,
              fechaCreacionPedido: new Date(p.fechaCreacionPedido),
              fechaEstimadaEntrega: new Date(p.fechaEstimadaEntrega),
              ciudadDestino: p.ciudadDestino,
              estadoPedido: p.estadoPedido,
              esPrioritario: p.esPrioritario,
              precioFinal: p.precioFinal,
              idCliente: p.idCliente,
              tipo: 'Carta',
              tipoCarta: p.tipoCarta
            }));
            console.log(' Paquetes Carta mapeados:', cartas.length);
            this.paquetes.push(...cartas);
          } else {
            console.log(' No hay paquetes carta registrados');
          }
          verificarFinalizacion();
        },
        error: () => verificarFinalizacion()
      });
    this.subscriptions.push(cartaSub);
  }


  getTipoClase(tipo: string): string {
    switch(tipo) {
      case 'Alimenticio': return 'alimenticio';
      case 'NoAlimenticio': return 'noalimenticio';
      case 'Carta': return 'carta';
      default: return '';
    }
  }

  getIcono(tipo: string): string {
    switch(tipo) {
      case 'Alimenticio': return 'fa-utensils';
      case 'NoAlimenticio': return 'fa-box';
      case 'Carta': return 'fa-envelope';
      default: return 'fa-box';
    }
  }

  getTipoTexto(tipo: string): string {
    switch(tipo) {
      case 'Alimenticio': return 'Paquete Alimenticio';
      case 'NoAlimenticio': return 'Paquete No Alimenticio';
      case 'Carta': return 'Paquete Carta';
      default: return tipo;
    }
  }

  getEstadoClase(estado: string): string {
    switch(estado?.toLowerCase()) {
      case 'pendiente': return 'pendiente';
      case 'enviado': return 'enviado';
      case 'entregado': return 'entregado';
      case 'cancelado': return 'cancelado';
      default: return '';
    }
  }

  aplicarFiltro(): void {
    if (this.filtroActual === 'Todos') {
      this.paquetesFiltrados = [...this.paquetes];
    } else {
      this.paquetesFiltrados = this.paquetes.filter((p: PaqueteUnificado) => p.tipo === this.filtroActual);
    }
    console.log(` Filtro: ${this.filtroActual} -> ${this.paquetesFiltrados.length} paquetes`);
  }

  onFiltroChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.filtroActual = select.value;
    this.aplicarFiltro();
  }

  actualizarPaquete(paquete: PaqueteUnificado) {
    this.router.navigate(['/admin/actualizar', 'paquete', paquete.tipo, paquete.id]);
  }


  eliminarPaquete(paquete: PaqueteUnificado): void {
    if (!confirm(`¿Estás seguro de eliminar el paquete #${paquete.id} (${this.getTipoTexto(paquete.tipo)})?`)) return;

    const paqueteEliminado = { ...paquete };

    let eliminar$;
    if (paquete.tipo === 'Alimenticio') {
      eliminar$ = this.paqueteAlimenticioService.eliminarPaqueteAlimenticio(paquete.id);
    } else if (paquete.tipo === 'NoAlimenticio') {
      eliminar$ = this.paqueteNoAlimenticioService.eliminarPaqueteNoAlimenticio(paquete.id);
    } else {
      eliminar$ = this.paqueteCartaService.eliminarPaqueteCarta(paquete.id);
    }

    this.cargando = true;

    const sub = eliminar$.subscribe({
      next: (respuesta: any) => {
        console.log(` Paquete ${paqueteEliminado.tipo} eliminado:`, respuesta);


        const index = this.paquetes.findIndex(p =>
          p.tipo === paqueteEliminado.tipo && p.id === paqueteEliminado.id
        );

        if (index !== -1) {
          this.paquetes.splice(index, 1);
          this.aplicarFiltro(); // Actualizar vista filtrada
          console.log(` Paquete eliminado de la lista local. Total restante: ${this.paquetes.length}`);
        }


        this.mensajeExito = ` Paquete #${paqueteEliminado.id} eliminado correctamente`;
        this.cargando = false;
        this.error = '';


        setTimeout(() => {
          if (this.mensajeExito === ` Paquete #${paqueteEliminado.id} eliminado correctamente`) {
            this.mensajeExito = '';
          }
        }, 3000);
      },
      error: (err) => {
        console.error(' Error al eliminar paquete:', err);
        this.cargando = false;
        this.error = `Error al eliminar paquete #${paqueteEliminado.id}: ${err.error || err.message}`;
        alert(this.error);
      }
    });

    this.subscriptions.push(sub);
  }

}
