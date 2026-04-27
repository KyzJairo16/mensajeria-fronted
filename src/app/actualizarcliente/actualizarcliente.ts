import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientenormalService } from '../services/clientenormal.service';
import { ClienteconcurrenteService } from '../services/clienteconcurrente.service';
import { ClientepremiumService } from '../services/clientepremium.service';

@Component({
  selector: 'app-actualizarcliente',
  standalone: false,
  templateUrl: './actualizarcliente.html',
  styleUrl: './actualizarcliente.css',
})
export class Actualizarcliente implements OnInit {
  tipo: string = '';
  id: string = '';
  modelo: any = {};
  cargando: boolean = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sNormal = inject(ClientenormalService);
  private sConcurrente = inject(ClienteconcurrenteService);
  private sPremium = inject(ClientepremiumService);

  ngOnInit(): void {
    // El '??' significa: "Si lo de la izquierda es nulo, usa lo de la derecha ('')"
    this.tipo = this.route.snapshot.paramMap.get('tipo') ?? '';
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.cargarDatos();
  }
  cargarDatos() {
    const idNum = Number(this.id);
    this.cargando = true;
    let consulta$: any;

    if (this.tipo === 'Normal') consulta$ = this.sNormal.getClientesNormales();
    else if (this.tipo === 'Concurrente') consulta$ = this.sConcurrente.getClientesConcurrentes();
    else consulta$ = this.sPremium.getClientesPremium();

    consulta$.subscribe({
      next: (res: any) => {
        const data = res.body ?? res;
        this.modelo = Array.isArray(data) ? data.find((item: any) => item.id === idNum) : data;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  guardar() {
    this.cargando = true;
    const m = this.modelo;
    let op$: any;

    if (this.tipo === 'Normal') op$ = this.sNormal.actualizarClienteNormal(m.id, m.nombre, m.cedula, m.correo, m.telefono, m.metodoPago, m.contrasenia);
    else if (this.tipo === 'Concurrente') op$ = this.sConcurrente.actualizarClienteConcurrente(m.id, m.nombre, m.cedula, m.correo, m.telefono, m.metodoPago, m.contrasenia);
    else op$ = this.sPremium.actualizarClientePremium(m.id, m.nombre, m.cedula, m.correo, m.telefono, m.metodoPago, m.contrasenia);

    // (op$ as any) corrige el error TS2349 de la imagen
    (op$ as any).subscribe({
      next: () => this.finalizar(),
      error: (err: any) => (err.status === 200) ? this.finalizar() : (alert('Error'), this.cargando = false)
    });
  }

  finalizar() {
    alert('Cliente actualizado con Ã©xito');
    this.router.navigate(['/admin/gestorcliente']);
  }
}
