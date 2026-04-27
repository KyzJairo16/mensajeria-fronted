import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ClientenormalService } from '../services/clientenormal.service';
import { ClienteconcurrenteService } from '../services/clienteconcurrente.service';
import { ClientepremiumService } from '../services/clientepremium.service';

import { AdministradorService } from '../services/administrador.service';
import { ConductorService } from '../services/conductor.service';
import { ManipuladordepaqueteService } from '../services/manipuladordepaquete.service';

import { PaquetecartaService } from '../services/paquetecarta.service';
import { PaquetealimenticioService } from '../services/paquetealimenticio.service';
import { PaquetenoalimenticioService } from '../services/paquetenoalimenticio.service';
import { FormsModule } from '@angular/forms';
import { NgClass, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-gestoractualizar',
  templateUrl: './gestoractualizar.html',
  styleUrls: ['./gestoractualizar.css'],
  imports: [FormsModule, NgClass, UpperCasePipe],
})
export class Gestoractualizar implements OnInit {
  categoria: string = '';
  tipo: string = '';
  id: string = '';

  modelo: any = {};
  cargando: boolean = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private sNormal = inject(ClientenormalService);
  private sConcurrente = inject(ClienteconcurrenteService);
  private sPremium = inject(ClientepremiumService);
  private sAdmin = inject(AdministradorService);
  private sConductor = inject(ConductorService);
  private sManipulador = inject(ManipuladordepaqueteService);
  private sCarta = inject(PaquetecartaService);
  private sAlimento = inject(PaquetealimenticioService);
  private sNoAlimento = inject(PaquetenoalimenticioService);

  ngOnInit(): void {
    this.categoria = this.route.snapshot.paramMap.get('categoria') || '';
    this.tipo = this.route.snapshot.paramMap.get('tipo') || '';
    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.cargarDatosActuales();
  }

  cargarDatosActuales(): void {
    const idNum = Number(this.id);
    this.cargando = true;

    let consulta$!: Observable<any>;

    switch (this.tipo) {
      case 'Normal':
        consulta$ = this.sNormal.getClientesNormales();
        break;
      case 'Concurrente':
        consulta$ = this.sConcurrente.getClientesConcurrentes();
        break;
      case 'Premium':
        consulta$ = this.sPremium.getClientesPremium();
        break;

      case 'Administrador':
        consulta$ = this.sAdmin.getAdministradores();
        break;
      case 'Conductor':
        consulta$ = this.sConductor.getConductores();
        break;
      case 'Manipulador':
        consulta$ = this.sManipulador.getManipuladores();
        break;

      case 'Carta':
        consulta$ = this.sCarta.buscarPorId(idNum);
        break;
      case 'Alimenticio':
        consulta$ = this.sAlimento.buscarPorId(idNum);
        break;
      case 'NoAlimenticio':
        consulta$ = this.sNoAlimento.buscarPorId(idNum);
        break;

      default:
        console.error('Tipo no reconocido:', this.tipo);
        this.cargando = false;
        return;
    }

    consulta$.subscribe({
      next: (res) => {
        const data = res?.body ?? res;

        if (Array.isArray(data)) {
          this.modelo = data.find((item: any) => item.id == idNum) || {};
        } else {
          this.modelo = data || {};
        }

        this.cargando = false;
      },

      error: (err: any) => {
        console.error('ERROR BACK:', err);
        alert('Error al cargar datos');
        this.cargando = false;
      },
    });
  }

  guardarCambios(): void {
    this.cargando = true;
    const m = this.modelo;

    let update$!: Observable<any>;

    switch (this.tipo) {
      case 'Normal':
        update$ = this.sNormal.actualizarClienteNormal(
          m.id,
          m.nombre,
          m.cedula,
          m.correo,
          m.telefono,
          m.metodoPago || 'Efectivo',
          m.contrasenia,
        );
        break;

      case 'Concurrente':
        update$ = this.sConcurrente.actualizarClienteConcurrente(
          m.id,
          m.nombre,
          m.cedula,
          m.correo,
          m.telefono,
          m.metodoPago || 'Efectivo',
          m.contrasenia,
        );
        break;

      case 'Premium':
        update$ = this.sPremium.actualizarClientePremium(
          m.id,
          m.nombre,
          m.cedula,
          m.correo,
          m.telefono,
          m.metodoPago || 'Efectivo',
          m.contrasenia,
        );
        break;

      case 'Administrador':
        update$ = this.sAdmin.actualizarAdministrador(
          m.id,
          m.nombre,
          m.cedula,
          m.correo,
          m.telefono,
          m.turno,
          m.usuario,
          m.contrasenia,
        );
        break;

      case 'Conductor':
        update$ = this.sConductor.actualizarConductor(
          m.id,
          m.nombre,
          m.cedula,
          m.correo,
          m.telefono,
          m.turno,
          m.placaVehiculo,
        );
        break;

      case 'Manipulador':
        update$ = this.sManipulador.actualizarManipulador(
          m.id,
          m.nombre,
          m.cedula,
          m.correo,
          m.telefono,
          m.turno,
          m.tipoManipulador,
        );
        break;

      case 'Carta':
        update$ = this.sCarta.actualizarPaqueteCarta(
          m.id,
          m.direccionDestino,
          m.ciudadDestino,
          m.tamanio,
          m.tipoCarta,
        );
        break;

      case 'Alimenticio':
        update$ = this.sAlimento.actualizarPaqueteAlimenticio(
          m.id,
          m.direccionDestino,
          m.ciudadDestino,
          m.tamanio,
          m.tipoDeAlimento,
        );
        break;

      case 'NoAlimenticio':
        update$ = this.sNoAlimento.actualizarPaqueteNoAlimenticio(
          m.id,
          m.direccionDestino,
          m.ciudadDestino,
          m.tamanio,
        );
        break;

      default:
        alert('Tipo no válido');
        this.cargando = false;
        return;
    }

    update$.subscribe({
      next: () => {
        alert('Actualización exitosa');
        this.cancelar();
      },

      error: (err: any) => {
        console.error('ERROR UPDATE:', err);
        alert('Error: ' + (err?.error || 'Error desconocido'));
        this.cargando = false;
      },
    });
  }

  cancelar(): void {
    const rutas: { [key: string]: string } = {
      cliente: '/admin/gestorcliente',
      trabajador: '/admin/gestortrabajador',
      paquete: '/admin/gestorpaquete',
    };

    this.router.navigate([rutas[this.categoria] || '/admin-main']);
  }
}
