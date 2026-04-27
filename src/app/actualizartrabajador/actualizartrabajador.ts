import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradorService } from '../services/administrador.service';
import { ConductorService } from '../services/conductor.service';
import { ManipuladordepaqueteService } from '../services/manipuladordepaquete.service';

@Component({
  selector: 'app-actualizartrabajador',
  standalone: false,
  templateUrl: './actualizartrabajador.html',
  styleUrl: './actualizartrabajador.css',
})
export class Actualizartrabajador implements OnInit {
  tipo: string = '';
  id: string = '';
  modelo: any = {};
  cargando: boolean = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sAdmin = inject(AdministradorService);
  private sCond = inject(ConductorService);
  private sManip = inject(ManipuladordepaqueteService);

  ngOnInit() {
    this.tipo = this.route.snapshot.paramMap.get('tipo') || '';
    this.id = this.route.snapshot.paramMap.get('id') || '';

    if (this.id) {
      this.cargarDatos();
    }
  }

  cargarDatos() {
    const idNum = Number(this.id);
    let query$: any;

    if (this.tipo === 'Administrador') query$ = this.sAdmin.getAdministradores();
    else if (this.tipo === 'Conductor') query$ = this.sCond.getConductores();
    else if (this.tipo === 'Manipulador') query$ = this.sManip.getManipuladores();

    if (query$) {
      (query$ as any).subscribe({
        next: (res: any) => {
          const data = res.body ?? res;
          this.modelo = Array.isArray(data) ? data.find((x: any) => x.id === idNum) : data;
        },
        error: () => this.cargando = false
      });
    }
  }

  guardar() {
    this.cargando = true;
    const m = this.modelo;

    // DEBUG: Revisa esto en la consola del navegador F12
    console.log('Enviando al servidor:', m);

    let op$: any;

    if (this.tipo === 'Administrador')
      op$ = this.sAdmin.actualizarAdministrador(m.id, m.nombre, m.cedula, m.correo, m.telefono, m.turno, m.usuario, m.contrasenia);
    else if (this.tipo === 'Conductor')
      op$ = this.sCond.actualizarConductor(m.id, m.nombre, m.cedula, m.correo, m.telefono, m.turno, m.placaVehiculo);
    else
      op$ = this.sManip.actualizarManipulador(m.id, m.nombre, m.cedula, m.correo, m.telefono, m.turno, m.tipoManipulador);

    (op$ as any).subscribe({
      next: () => this.exito(),
      error: (err: any) => {
        this.cargando = false;
        if (err.status === 200) this.exito();
        else alert('Error al guardar. Revisa la consola.');
      }
    });
  }

  exito() {
    alert('Trabajador actualizado con éxito');
    this.router.navigate(['/gestortrabajador']);
  }

  cancelar() {
    this.router.navigate(['/gestortrabajador']);
  }

}
