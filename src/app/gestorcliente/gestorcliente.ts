// gestorcliente.ts - VERSIÓN CORREGIDA
import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ClientenormalService } from '../services/clientenormal.service';
import { ClienteconcurrenteService } from '../services/clienteconcurrente.service';
import { ClientepremiumService } from '../services/clientepremium.service';
import { ClientenormalModel } from '../models/clientenormal.model';
import { ClienteconcurrenteModel } from '../models/clienteconcurrente.model';
import { ClientepremiumModel } from '../models/clientepremium.model';

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
export class Gestorcliente implements OnInit {

  private clienteNormalService = inject(ClientenormalService);
  private clienteConcurrenteService = inject(ClienteconcurrenteService);
  private clientePremiumService = inject(ClientepremiumService);

  clientes: ClienteUnificado[] = [];
  clientesFiltrados: ClienteUnificado[] = [];
  filtroActual: string = 'Todos';
  cargando: boolean = true; // Inicializar en true
  error: string = '';
  historialVisible: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this.cargarTodosLosClientes();
  }

  cargarTodosLosClientes(): void {
    this.cargando = true;
    this.error = '';
    this.clientes = [];

    // Contador de peticiones completadas
    let peticionesCompletadas = 0;
    const totalPeticiones = 3; // Normal, Concurrente, Premium

    const verificarFinalizacion = () => {
      peticionesCompletadas++;
      console.log(`📊 Peticiones completadas: ${peticionesCompletadas}/${totalPeticiones}`);

      if (peticionesCompletadas === totalPeticiones) {
        this.cargando = false;
        console.log('🟢 Total clientes cargados:', this.clientes.length);
        console.table(this.clientes);
        this.aplicarFiltro();

        if (this.clientes.length === 0 && !this.error) {
          this.error = 'No hay clientes registrados en el sistema.';
        }
      }
    };

    // Cargar clientes normales
    this.clienteNormalService.getClientesNormales().subscribe({
      next: (resp: HttpResponse<ClientenormalModel[]>) => {
        console.log('📋 Clientes Normales - Status:', resp.status);

        if (resp.body && Array.isArray(resp.body) && resp.body.length > 0) {
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
      error: (err: any) => {
        console.error('❌ Error cargando clientes normales:', err.message);
        verificarFinalizacion();
      }
    });

    // Cargar clientes concurrentes
    this.clienteConcurrenteService.getClientesConcurrentes().subscribe({
      next: (resp: HttpResponse<ClienteconcurrenteModel[]>) => {
        console.log('📋 Clientes Concurrentes - Status:', resp.status);

        if (resp.body && Array.isArray(resp.body) && resp.body.length > 0) {
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
      error: (err: any) => {
        console.error('❌ Error cargando clientes concurrentes:', err.message);
        verificarFinalizacion();
      }
    });

    // Cargar clientes premium
    this.clientePremiumService.getClientesPremium().subscribe({
      next: (resp: HttpResponse<ClientepremiumModel[]>) => {
        console.log('📋 Clientes Premium - Status:', resp.status);

        if (resp.body && Array.isArray(resp.body) && resp.body.length > 0) {
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
      error: (err: any) => {
        console.error('❌ Error cargando clientes premium:', err.message);
        verificarFinalizacion();
      }
    });
  }

  actualizarCliente(cliente: ClienteUnificado): void {
    console.log('📝 Actualizar cliente:', cliente);
    // Aquí puedes implementar la lógica de actualización
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

  eliminarCliente(cliente: ClienteUnificado): void {
    if (!confirm(`¿Eliminar a ${cliente.nombre}?`)) return;

    if (cliente.tipo === 'Normal') {
      this.clienteNormalService.eliminarClienteNormal(cliente.id).subscribe({
        next: () => {
          console.log('Cliente normal eliminado');
          this.cargarTodosLosClientes();
        },
        error: (err) => {
          console.error('Error:', err);
          alert('Error al eliminar cliente');
        }
      });
    } else if (cliente.tipo === 'Concurrente') {
      this.clienteConcurrenteService.eliminarClienteConcurrente(cliente.id).subscribe({
        next: () => {
          console.log('Cliente concurrente eliminado');
          this.cargarTodosLosClientes();
        },
        error: (err) => {
          console.error('Error:', err);
          alert('Error al eliminar cliente');
        }
      });
    } else if (cliente.tipo === 'Premium') {
      this.clientePremiumService.eliminarClientePremium(cliente.id).subscribe({
        next: () => {
          console.log('Cliente premium eliminado');
          this.cargarTodosLosClientes();
        },
        error: (err) => {
          console.error('Error:', err);
          alert('Error al eliminar cliente');
        }
      });
    }
  }
}
