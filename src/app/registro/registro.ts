import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  paso: number = 1;

  datos = {
    nombre: '',
    cedula: '',
    correo: '',
    telefono: '',
    tipoCliente: '',
    contrasenia: '',
  };

  irAlPaso2() {
    if (this.datos.nombre && this.datos.cedula && this.datos.correo && this.datos.telefono) {
      this.paso = 2;
    } else {
      alert('Por favor, completa todos los campos del Paso 1.');
    }
  }

  finalizar() {
    if (this.datos.tipoCliente && this.datos.contrasenia) {
      alert('¡Registro exitoso para ' + this.datos.nombre + '!');
      console.log('Enviando al Back:', this.datos);
    } else {
      alert('Completa el tipo de cliente y la contraseña.');
    }
  }
}
