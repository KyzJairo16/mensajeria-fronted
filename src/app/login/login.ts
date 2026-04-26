import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ClientenormalService } from '../services/clientenormal.service';
import { ClientepremiumService } from '../services/clientepremium.service';
import { ClienteconcurrenteService } from '../services/clienteconcurrente';

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
        console.log('✅ Cliente Normal encontrado:', respuesta);
        this.router.navigate(['/cliente']);
      },
      error: () => this.intentarLoginPremium()
    });
  }

  private intentarLoginPremium() {

    this.premiumService.login(this.credencial.cedula, this.credencial.pass).subscribe({
      next: (respuesta) => {
        console.log( respuesta);
        this.router.navigate(['/cliente']);
      },
      error: () => this.intentarLoginConcurrente()
    });
  }

  private intentarLoginConcurrente() {

    this.concurrenteService.login(this.credencial.cedula, this.credencial.pass).subscribe({
      next: (respuesta) => {
        console.log( respuesta);
        this.router.navigate(['/cliente']);
      },
      error: () => {

        console.log('Error: Las credenciales no coinciden con ningún cliente.');
      }
    });
  }
}
