import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaquetecartaModel } from '../models/paquetecarta.model';

@Injectable({
  providedIn: 'root',
})
export class PaquetecartaService{
  private http = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';


  getPaquetesCarta() {
    return this.http.get<PaquetecartaModel[]>(this.urlbase + '/paquetecarta/mostrartodo', {
      observe: 'response',
    });
  }


  crearPaqueteCarta(precioEnvio: number, direccionDestino: string, tamanio: string, fechaCreacionPedido: Date, fechaEstimadaEntrega: Date, tipoCarta: string) {
    return this.http.post(this.urlbase + '/paquetecarta/crear?precioEnvio=' + precioEnvio + '&direccionDestino=' + direccionDestino + '&tamanio=' + tamanio + '&fechaCreacionPedido=' + fechaCreacionPedido + '&fechaEstimadaEntrega=' + fechaEstimadaEntrega + '&tipoCarta=' + tipoCarta, null, {
      responseType: 'text',
    });
  }


  actualizarPaqueteCarta(id: number, precioEnvio: number, direccionDestino: string, tamanio: string, fechaCreacionPedido: Date, fechaEstimadaEntrega: Date, tipoCarta: string) {
    return this.http.put(this.urlbase + '/paquetecarta/actualizar?id=' + id + '&precioEnvio=' + precioEnvio + '&direccionDestino=' + direccionDestino + '&tamanio=' + tamanio + '&fechaCreacionPedido=' + fechaCreacionPedido + '&fechaEstimadaEntrega=' + fechaEstimadaEntrega + '&tipoCarta=' + tipoCarta, null, {
      responseType: 'text',
    });
  }


  eliminarPaqueteCarta(id: number) {
    return this.http.delete(this.urlbase + '/paquetecarta/eliminar?id=' + id, {
      responseType: 'text',
    });
  }

  // Búsqueda por precio de envío
  buscarPorPrecioEnvio(precioEnvio: number) {
    return this.http.get<PaquetecartaModel[]>(this.urlbase + '/paquetecarta/buscarporprecioenvio?precioEnvio=' + precioEnvio, {
      observe: 'response',
    });
  }

  // Búsqueda por tipo de carta
  buscarPorTipoCarta(tipoCarta: string) {
    return this.http.get<PaquetecartaModel[]>(this.urlbase + '/paquetecarta/buscarportipocarta?tipoCarta=' + tipoCarta, {
      observe: 'response',
    });
  }
}
