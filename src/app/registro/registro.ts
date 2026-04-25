import { Component, inject } from '@angular/core';
import { ClientenormalService } from '../services/clientenormal.service';
import { ClienteconcurrenteService } from '../services/clienteconcurrente';
import { ClientepremiumService } from '../services/clientepremium.service';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

  public clienteNormal = inject(ClientenormalService);
  public clienteConcurrente = inject(ClienteconcurrenteService);
  public clientePremium = inject(ClientepremiumService);

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

      if (this.datos.tipoCliente == 'normal') {
        this.clienteNormal.crearClienteNormal(this.datos.nombre, this.datos.cedula, this.datos.correo, this.datos.telefono, this.datos.contrasenia)
          .subscribe({
            next: (res: string) => console.log(res),
            error: (err) => console.log('Error: ' + (err.error || err.message))
          });

      } else if (this.datos.tipoCliente == 'concurrente') {
        this.clienteConcurrente.crearClienteConcurrente(this.datos.nombre, this.datos.cedula, this.datos.correo, this.datos.telefono, this.datos.contrasenia)
          .subscribe({
            next: (res: string) => console.log(res),
            error: (err) => console.log('Error: ' + (err.error || err.message))
          });

      } else if (this.datos.tipoCliente == 'premium') {
        this.clientePremium.crearClientePremium(this.datos.nombre, this.datos.cedula, this.datos.correo, this.datos.telefono, this.datos.contrasenia)
          .subscribe({
            next: (res: string) => console.log(res),
            error: (err) => console.log('Error: ' + (err.error || err.message))
          });
      }

    } else {
      alert('Completa el tipo de cliente y la contraseña.');
    }
  }


}
