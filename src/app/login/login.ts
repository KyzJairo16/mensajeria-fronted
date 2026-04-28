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
      next: (respuesta: any) => {

        let clienteCompleto = typeof respuesta === 'string' ? JSON.parse(respuesta) : respuesta;


        clienteCompleto.tipoCliente = 'Normal';


        localStorage.setItem('usuarioLogueado', JSON.stringify(clienteCompleto));
        this.router.navigate(['/cliente']);
      },
      error: () => this.intentarLoginPremium()
    });
  }

  private intentarLoginPremium() {
    this.premiumService.login(this.credencial.cedula, this.credencial.pass).subscribe({
      next: (respuesta: any) => {
        let clienteCompleto = typeof respuesta === 'string' ? JSON.parse(respuesta) : respuesta;
        clienteCompleto.tipoCliente = 'Premium';
        localStorage.setItem('usuarioLogueado', JSON.stringify(clienteCompleto));
        this.router.navigate(['/cliente']);
      },
      error: () => this.intentarLoginConcurrente()
    });
  }

  private intentarLoginConcurrente() {
    this.concurrenteService.login(this.credencial.cedula, this.credencial.pass).subscribe({
      next: (respuesta: any) => {
        let clienteCompleto = typeof respuesta === 'string' ? JSON.parse(respuesta) : respuesta;
        clienteCompleto.tipoCliente = 'Concurrente';
        localStorage.setItem('usuarioLogueado', JSON.stringify(clienteCompleto));
        this.router.navigate(['/cliente']);
      },
      error: () => {
        console.log('Credenciales incorrectas');
      }
    });
  }

}
