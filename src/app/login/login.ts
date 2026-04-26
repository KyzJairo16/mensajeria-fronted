import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ClientenormalService } from '../services/clientenormal.service';
import { ClientepremiumService } from '../services/clientepremium.service';
import { ClienteconcurrenteService } from '../services/clienteconcurrente.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  credencial = {
    cedula: '',
    pass: ''
  };

  // Inyectamos los servicios
  private normalService = inject(ClientenormalService);
  private premiumService = inject(ClientepremiumService);
  private concurrenteService = inject(ClienteconcurrenteService);
  private router = inject(Router);


  ingresar() {
    if (!this.credencial.cedula || !this.credencial.pass) {
      console.log('Por favor ingrese cédula y contraseña');
      return;
    }

    this.intentarLoginNormal();
  }

  private intentarLoginNormal() {
    this.normalService.login(this.credencial.cedula, this.credencial.pass).subscribe({
      next: (respuesta) => {
        // 👇 CAMBIA ESTO - guarda con la clave que espera nuevoenvio
        localStorage.setItem('usuarioLogueado', JSON.stringify({
          id: this.credencial.cedula, // o el id real si el backend lo devuelve
          cedula: this.credencial.cedula,
          tipo: 'normal'
        }));
        this.router.navigate(['/cliente']);
      },
      error: () => this.intentarLoginPremium()
    });
  }

  private intentarLoginPremium() {
    this.premiumService.login(this.credencial.cedula, this.credencial.pass).subscribe({
      next: (respuesta) => {
        localStorage.setItem('usuarioLogueado', JSON.stringify({
          id: this.credencial.cedula,
          cedula: this.credencial.cedula,
          tipo: 'premium'
        }));
        this.router.navigate(['/cliente']);
      },
      error: () => this.intentarLoginConcurrente()
    });
  }

  private intentarLoginConcurrente() {
    this.concurrenteService.login(this.credencial.cedula, this.credencial.pass).subscribe({
      next: (respuesta) => {
        localStorage.setItem('usuarioLogueado', JSON.stringify({
          id: this.credencial.cedula,
          cedula: this.credencial.cedula,
          tipo: 'concurrente'
        }));
        this.router.navigate(['/cliente']);
      },
      error: () => {
        console.log('Credenciales incorrectas');
      }
    });
  }
}
