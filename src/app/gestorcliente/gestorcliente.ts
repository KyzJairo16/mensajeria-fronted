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
  cargando: boolean = false;
  error: string = '';
  historialVisible: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this.cargarTodosLosClientes();
  }

  cargarTodosLosClientes(): void {
    this.cargando = true;
    this.error = '';
    this.clientes = [];

    let normalesListo = false;
    let concurrentesListo = false;
    let premiumListo = false;

    const verificarYFiltrar = () => {
      if (normalesListo && concurrentesListo && premiumListo) {
        this.cargando = false;
        console.log('🟢 Total clientes cargados:', this.clientes.length);
        console.table(this.clientes);
        this.aplicarFiltro();
      }
    };

    this.clienteNormalService.getClientesNormales().subscribe({
      next: (resp: HttpResponse<ClientenormalModel[]>) => {
        console.log('📋 Clientes Normales (raw):', resp.body);
        if (resp.body) {
          const normales: ClienteUnificado[] = resp.body.map((c: ClientenormalModel) => ({
            id: (c as any).id,
            nombre: c.nombre,
            cedula: c.cedula,
            correo: c.correo,
            telefono: c.telefono,
            tipo: 'Normal' as const,
            metodoPago: (c as any).metodoPago
          }));
          console.log('✅ Clientes Normales mapeados:', normales);
          this.clientes.push(...normales);
        }
        normalesListo = true;
        verificarYFiltrar();
      },
      error: (err: any) => {
        console.error('❌ Error cargando clientes normales:', err);
        normalesListo = true;
        verificarYFiltrar();
      }
    });

    this.clienteConcurrenteService.getClientesConcurrentes().subscribe({
      next: (resp: HttpResponse<ClienteconcurrenteModel[]>) => {
        console.log('📋 Clientes Concurrentes (raw):', resp.body);
        if (resp.body) {
          const concurrentes: ClienteUnificado[] = resp.body.map((c: ClienteconcurrenteModel) => ({
            id: (c as any).id,
            nombre: c.nombre,
            cedula: c.cedula,
            correo: c.correo,
            telefono: c.telefono,
            tipo: 'Concurrente' as const,
            metodoPago: (c as any).metodoPago
          }));
          console.log('✅ Clientes Concurrentes mapeados:', concurrentes);
          this.clientes.push(...concurrentes);
        }
        concurrentesListo = true;
        verificarYFiltrar();
      },
      error: (err: any) => {
        console.error('❌ Error cargando clientes concurrentes:', err);
        concurrentesListo = true;
        verificarYFiltrar();
      }
    });

    this.clientePremiumService.getClientesPremium().subscribe({
      next: (resp: HttpResponse<ClientepremiumModel[]>) => {
        console.log('📋 Clientes Premium (raw):', resp.body);
        if (resp.body) {
          const premium: ClienteUnificado[] = resp.body.map((c: ClientepremiumModel) => ({
            id: (c as any).id,
            nombre: c.nombre,
            cedula: c.cedula,
            correo: c.correo,
            telefono: c.telefono,
            tipo: 'Premium' as const,
            metodoPago: (c as any).metodoPago
          }));
          console.log('✅ Clientes Premium mapeados:', premium);
          this.clientes.push(...premium);
        }
        premiumListo = true;
        verificarYFiltrar();
      },
      error: (err: any) => {
        console.error('❌ Error cargando clientes premium:', err);
        premiumListo = true;
        verificarYFiltrar();
      }
    });
  }

  aplicarFiltro(): void {
    if (this.filtroActual === 'Todos') {
      this.clientesFiltrados = [...this.clientes];
    } else {
      this.clientesFiltrados = this.clientes.filter((c: ClienteUnificado) => c.tipo === this.filtroActual);
    }
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
        next: () => this.cargarTodosLosClientes(),
        error: () => alert('Error al eliminar cliente')
      });
    } else if (cliente.tipo === 'Concurrente') {
      this.clienteConcurrenteService.eliminarClienteConcurrente(cliente.id).subscribe({
        next: () => this.cargarTodosLosClientes(),
        error: () => alert('Error al eliminar cliente')
      });
    } else if (cliente.tipo === 'Premium') {
      this.clientePremiumService.eliminarClientePremium(cliente.id).subscribe({
        next: () => this.cargarTodosLosClientes(),
        error: () => alert('Error al eliminar cliente')
      });
    }
  }
}
