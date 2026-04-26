import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from '../services/administrador.service';

@Component({
  selector: 'app-inicioadministrador',
  standalone: false,
  templateUrl: './inicioadministrador.html',
  styleUrl: './inicioadministrador.css',
})
export class Inicioadministrador {
  credenciales = {
    usuario: '',
    contrasenia: ''
  };

  mensajeError: string = '';

  private router = inject(Router);
  private adminService = inject(AdministradorService);

  iniciarSesion() {
    this.mensajeError = '';

    this.adminService.loginAdmin(this.credenciales.usuario, this.credenciales.contrasenia).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        this.router.navigate(['/administrador']);
      },
      error: (err) => {
        this.mensajeError = err.error || 'Error de acceso';
        console.log(this.mensajeError);
      }
    });
  }
}
