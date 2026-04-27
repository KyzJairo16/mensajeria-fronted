import { Component, OnInit, inject } from '@angular/core';
import {ActivatedRoute,Route, Router} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestoractualizar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestoractualizar.html',
  styleUrls: ['./gestoractualizar.css']
})
export class Gestoractualizar implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  categoria: string = ''; // 'cliente', 'trabajador' o 'paquete'
  tipo: string = '';      // 'Premium', 'Conductor', 'Carta', etc.
  id: string = '';

  cancelar(){
    this.router.navigate([`/${this.categoria}`]);

  }

  ngOnInit() {
    // Leemos los parámetros de la URL
    this.categoria = this.route.snapshot.params['categoria'];
    this.tipo = this.route.snapshot.params['tipo'];
    this.id = this.route.snapshot.params['id'];
  }
}
