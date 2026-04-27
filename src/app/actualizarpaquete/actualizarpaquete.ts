import {Component, OnInit, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PaquetecartaService} from '../services/paquetecarta.service';
import {PaquetealimenticioService} from '../services/paquetealimenticio.service';
import {PaquetenoalimenticioService} from '../services/paquetenoalimenticio.service';

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

  ciudades: string[] = [
    'Armenia', 'Barranquilla', 'Bogotá', 'Bucaramanga', 'Cali',
    'Cartagena', 'Cúcuta', 'Florencia', 'Ibagué', 'Manizales',
    'Medellín', 'Montería', 'Neiva', 'Pasto', 'Pereira',
    'Popayán', 'Quibdó', 'Riohacha', 'Santa Marta', 'Sincelejo',
    'Tunja', 'Valledupar', 'Villavicencio', 'Yopal'
  ].sort();

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sCarta = inject(PaquetecartaService);
  private sAlim = inject(PaquetealimenticioService);
  private sNoAlim = inject(PaquetenoalimenticioService);

  ngOnInit() {
    this.tipo = this.route.snapshot.paramMap.get('tipo') || '';
    this.id = this.route.snapshot.paramMap.get('id') || '';

    if (this.id) {
      this.cargar();
    }
  }

  cargar() {
    const idNum = Number(this.id);
    let obs$: any;

    if (this.tipo === 'Carta') obs$ = this.sCarta.buscarPorId(idNum);
    else if (this.tipo === 'Alimenticio') obs$ = this.sAlim.buscarPorId(idNum);
    else if (this.tipo === 'NoAlimenticio') obs$ = this.sNoAlim.buscarPorId(idNum);

    if (obs$) {
      obs$.subscribe({
        next: (res: any) => {
          this.modelo = res.body ?? res;
        }
      });
    }
  }

  guardar() {
    this.cargando = true;
    const m = this.modelo;

    console.log('Enviando al servidor:', m);

    let op$: any;

    if (this.tipo === 'Carta') {
      op$ = this.sCarta.actualizarPaqueteCarta(m.id, m.direccionDestino, m.ciudadDestino, m.tamanio, m.tipoCarta);
    } else if (this.tipo === 'Alimenticio') {
      op$ = this.sAlim.actualizarPaqueteAlimenticio(m.id, m.direccionDestino, m.ciudadDestino, m.tamanio, m.tipoDeAlimento);
    } else {
      op$ = this.sNoAlim.actualizarPaqueteNoAlimenticio(m.id, m.direccionDestino, m.ciudadDestino, m.tamanio);
    }

    (op$ as any).subscribe({
      next: () => this.listo(),
      error: (err: any) => {
        this.cargando = false;
        if (err.status === 200) {
          this.listo();
        } else {
          // Si el backend lo rechaza, te dirá el motivo en pantalla
          alert('Error al guardar: ' + (err.error || 'Revisa la consola.'));
          console.error(err);
        }
      }
    });
  }

  listo() {
    alert('Paquete actualizado con éxito');
    this.router.navigate(['/gestorpaquete']);
  }

  cancelar() {
    this.router.navigate(['/gestorpaquete']);
  }
}
