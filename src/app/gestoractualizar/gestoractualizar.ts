import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestoractualizar',
  templateUrl: './gestoractualizar.html'
})
export class Gestoractualizar implements OnInit {
  private route = inject(ActivatedRoute);

  categoria: string = ''; // 'cliente', 'trabajador' o 'paquete'
  tipo: string = '';      // 'Premium', 'Conductor', 'Carta', etc.
  id: string = '';

  ngOnInit() {
    // Leemos los parámetros de la URL
    this.categoria = this.route.snapshot.params['categoria'];
    this.tipo = this.route.snapshot.params['tipo'];
    this.id = this.route.snapshot.params['id'];
  }
}
