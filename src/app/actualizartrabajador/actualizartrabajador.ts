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
    this.tipo = this.route.snapshot.paramMap.get('tipo') ;
    this.id = this.route.snapshot.paramMap.get('id');
    this.cargarDatos();
  }

  cargarDatos() {
    const idNum = Number(this.id);
    let query$: any;
    if (this.tipo === 'Administrador') query$ = this.sAdmin.getAdministradores();
    else if (this.tipo === 'Conductor') query$ = this.sCond.getConductores();
    else query$ = this.sManip.getManipuladores();

    query$.subscribe({
      next: (res: any) => {
        const data = res.body ?? res;
        this.modelo = data.find((x: any) => x.id === idNum) || {};
      }
    });
  }

  guardar() {
    this.cargando = true;
    const m = this.modelo;
    let op$: any;

    if (this.tipo === 'Administrador') op$ = this.sAdmin.actualizarAdministrador(m.id, m.nombre, m.cedula, m.correo, m.telefono, m.turno, m.usuario, m.contrasenia);
    else if (this.tipo === 'Conductor') op$ = this.sCond.actualizarConductor(m.id, m.nombre, m.cedula, m.correo, m.telefono, m.turno, m.placaVehiculo);
    else op$ = this.sManip.actualizarManipulador(m.id, m.nombre, m.cedula, m.correo, m.telefono, m.turno, m.tipoManipulador);

    (op$ as any).subscribe({
      next: () => this.exito(),
      error: (err: any) => err.status === 200 ? this.exito() : (this.cargando = false)
    });
  }

  exito() {
    alert('Trabajador actualizado');
    this.router.navigate(['/admin/gestortrabajador']);
  }
}
