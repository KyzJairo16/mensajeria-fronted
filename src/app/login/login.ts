import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service'; // Verifica que la carpeta sea 'services'

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // Variables vinculadas al HTML con [(ngModel)]
  cedula: string = '';
  pass: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  /**
   * Intenta ingresar al sistema
   */
  ingresar() {
    if (!this.cedula || !this.pass) {
      alert('Por favor ingrese cédula y contraseña');
      return;
    }

    // Iniciamos la búsqueda en cadena por los controladores de Java
    this.intentarLogin('clientenormal');
  }

  /**
   * Lógica de búsqueda secuencial en los controladores de Spring Boot
   */
  private intentarLogin(tipo: string) {
    this.loginService.validarUsuario(this.cedula, this.pass, tipo).subscribe({
      next: (usuarioDeBD: any) => {
        if (usuarioDeBD) {
          /* GUARDADO CLAVE:
             Se guarda el objeto real de la DB. Como tus clases en Java heredan
             de Usuario, este objeto trae el 'id' que necesita Nuevoenvio.
          */
          localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioDeBD));

          alert(`Bienvenido ${usuarioDeBD.nombre}.`);
          this.router.navigate(['/cliente']);
        }
      },
      error: (err: any) => {
        // Si no está en un controlador, intenta en el siguiente
        if (tipo === 'clientenormal') {
          console.log('Buscando en premium...');
          this.intentarLogin('clientepremium');
        }
        else if (tipo === 'clientepremium') {
          console.log('Buscando en concurrente...');
          this.intentarLogin('clienteconcurrente');
        }
        else {
          // Si falló en los tres controladores
          alert('Error: Las credenciales no coinciden con ningún cliente.');
        }
      }
    });
  }
}
