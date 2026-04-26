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

  private cedulaInvalida = false;

  private intentarLoginNormal() {
    this.normalService.login(this.credencial.cedula, this.credencial.pass).subscribe({
      next: (resp: any) => {
        const codigo = resp.body ?? resp;
        if (codigo === 0) {
          this.router.navigate(['/cliente']);
          console.log('Inicio de sesion exitoso');
        }
      },
      error: (err) => {
        const codigo = err.error;
        if (err.status === 401) {
          // Contraseña incorrecta — detenemos la cadena
          console.log('Credenciales incorrectas');
        } else if (err.status === 400) {
          this.cedulaInvalida = true;
          console.log('Cédula inválida');
        } else if (err.status === 404) {
          // No existe en Normal → probar Premium
          this.intentarLoginPremium();
        }
      }
    });
  }

  private intentarLoginPremium() {
    this.premiumService.login(this.credencial.cedula, this.credencial.pass).subscribe({
      next: (resp: any) => {
        const codigo = resp.body ?? resp;
        if (codigo === 0) {
          this.router.navigate(['/cliente']);
          console.log('Inicio de sesion exitoso');
        }
      },
      error: (err) => {
        if (err.status === 401) {
          console.log('Credenciales incorrectas');
        } else if (err.status === 400) {
          this.cedulaInvalida = true;
          console.log('Cédula inválida');
        } else if (err.status === 404) {
          this.intentarLoginConcurrente();
        }
      }
    });
  }

  private intentarLoginConcurrente() {
    this.concurrenteService.login(this.credencial.cedula, this.credencial.pass).subscribe({
      next: (resp: any) => {
        const codigo = resp.body ?? resp;
        if (codigo === 0) {
          this.router.navigate(['/cliente']);
          console.log('Inicio de sesion exitoso');
        }
      },
      error: (err) => {
        if (err.status === 401) {
          console.log('Credenciales incorrectas');
        } else if (err.status === 400) {
          console.log('Cédula inválida');
        } else if (err.status === 404) {
          if (this.cedulaInvalida) {
            console.log('Cédula inválida');
          } else {
            console.log('Usuario no encontrado en ningún sistema');
          }
        }
      }
    });
  }
}
