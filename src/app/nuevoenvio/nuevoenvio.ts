import { Component, OnInit } from '@angular/core'; // Importamos OnInit
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevoenvio',
  standalone: false,
  templateUrl: './nuevoenvio.html',
  styleUrl: './nuevoenvio.css',
})
export class Nuevoenvio implements OnInit { // Implementamos OnInit
  tipoSeleccionado: string = 'alimenticio';
  idClienteLogueado: number = 0; // Variable para el blindaje

  paquete: any = {
    direccionDestino: '',
    ciudadDestino: '',
    tamanio: 'Mediano',
    tipoDeAlimento: '',
    tipoCarta: '',
    descripcionContenido: '', // Agregado para No Alimenticio
    seEnviaHoy: true
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Recuperamos el ID del cliente que guardamos en el Login
    const userJson = localStorage.getItem('usuarioLogueado');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.idClienteLogueado = user.id; // Asegúrate que en el login lo guardas como 'id'
    } else {
      alert("Sesión expirada. Por favor inicie sesión nuevamente.");
      this.router.navigate(['/login']);
    }
  }

  guardarEnvio() {
    const base = 'http://localhost:8080';
    let url = '';

    // Inicializamos params con los datos comunes Y el idCliente (Blindaje)
    let params = new HttpParams()
      .set('idCliente', this.idClienteLogueado.toString()) // <-- CRÍTICO
      .set('direccionDestino', this.paquete.direccionDestino)
      .set('ciudadDestino', this.paquete.ciudadDestino)
      .set('tamanio', this.paquete.tamanio);

    // Configuración según el tipo seleccionado
    if (this.tipoSeleccionado === 'alimenticio') {
      url = `${base}/paquetealimenticio/crear`;
      params = params
        .set('seEnviaHoy', this.paquete.seEnviaHoy.toString())
        .set('tipoDeAlimento', this.paquete.tipoDeAlimento);
    }
    else if (this.tipoSeleccionado === 'no-alimenticio') {
      url = `${base}/paquetenoalimenticio/crear`;
      params = params.set('descripcionContenido', this.paquete.descripcionContenido);
    }
    else if (this.tipoSeleccionado === 'carta') {
      url = `${base}/paquetecarta/crear`;
      params = params.set('tipoCarta', this.paquete.tipoCarta);
    }

    // Ejecución de la petición
    this.http.post(url, {}, { params, responseType: 'text' }).subscribe({
      next: (res) => {
        alert("¡Éxito!: " + res);
        this.router.navigate(['/cliente']);
      },
      error: (err) => {
        console.error(err);
        alert('Error: ' + (err.error || 'No se pudo conectar con el servidor'));
      }
    });
  }
}
