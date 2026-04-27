import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaquetecartaService } from '../services/paquetecarta.service';
import { PaquetealimenticioService } from '../services/paquetealimenticio.service';
import { PaquetenoalimenticioService } from '../services/paquetenoalimenticio.service';

@Component({
  selector: 'app-actualizarpaquete',
  standalone: false,
  templateUrl: './actualizarpaquete.html',
  styleUrl: './actualizarpaquete.css',
})
export class Actualizarpaquete implements OnInit {
  tipo: string = '';
  id: string = '';
  modelo: any = {};
  cargando: boolean = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sCarta = inject(PaquetecartaService);
  private sAlim = inject(PaquetealimenticioService);
  private sNoAlim = inject(PaquetenoalimenticioService);

  ngOnInit() {
    // CORRECCIÓN: Se añade ?? '' para evitar el error de "null"
    this.tipo = this.route.snapshot.paramMap.get('tipo') ?? '';
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.cargar();
  }

  cargar() {
    const idNum = Number(this.id);
    if (!idNum) return; // Seguridad si el ID no es válido

    let obs$: any;
    if (this.tipo === 'Carta') obs$ = this.sCarta.buscarPorId(idNum);
    else if (this.tipo === 'Alimenticio') obs$ = this.sAlim.buscarPorId(idNum);
    else obs$ = this.sNoAlim.buscarPorId(idNum);

    obs$.subscribe({ next: (res: any) => this.modelo = res.body ?? res });
  }

  guardar() {
    this.cargando = true;
    const m = this.modelo;
    let op$: any;

    if (this.tipo === 'Carta') op$ = this.sCarta.actualizarPaqueteCarta(m.id, m.direccionDestino, m.ciudadDestino, m.tamanio, m.tipoCarta);
    else if (this.tipo === 'Alimenticio') op$ = this.sAlim.actualizarPaqueteAlimenticio(m.id, m.direccionDestino, m.ciudadDestino, m.tamanio, m.tipoDeAlimento);
    else op$ = this.sNoAlim.actualizarPaqueteNoAlimenticio(m.id, m.direccionDestino, m.ciudadDestino, m.tamanio);

    (op$ as any).subscribe({
      next: () => this.listo(),
      error: (err: any) => err.status === 200 ? this.listo() : (this.cargando = false)
    });
  }

  listo() {
    alert('Paquete actualizado');
    this.router.navigate(['/admin/gestorpaquete']);
  }
}
