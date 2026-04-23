import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaquetecartaModel } from '../models/paquetecarta.model';
import { PaquetealimenticioModel } from '../models/paquetealimenticio.model';

@Injectable({
  providedIn: 'root',
})
export class PaqueteAlimenticioService {
  private http = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';


  getPaquetesAlimenticios() {
    return this.http.get<PaquetecartaModel[]>(this.urlbase + '/paquetealimenticio/mostrartodo', {
      observe: 'response',
    });
  }


  crearPaqueteAlimenticio(seEnviaHoy: boolean, tipoDeAlimento: string, precioEnvio: number, direccionDestino: string, tamanio: string, fechaCreacion: Date, fechaEntrega: Date) {
    return this.http.post(this.urlbase + '/paquetealimenticio/crear?seEnviaHoy=' + seEnviaHoy + '&tipoDeAlimento=' + tipoDeAlimento + '&precioEnvio=' + precioEnvio + '&direccionDestino=' + direccionDestino + '&tamanio=' + tamanio + '&fechaCreacionPedido=' + fechaCreacion + '&fechaEstimadaEntrega=' + fechaEntrega, null, {
      responseType: 'text',
    });
  }


  actualizarPaqueteAlimenticio(id: number, seEnviaHoy: boolean, tipoDeAlimento: string, precioEnvio: number, direccionDestino: string, tamanio: string, fechaCreacion: Date, fechaEntrega: Date) {
    return this.http.put(this.urlbase + '/paquetealimenticio/actualizar?id=' + id + '&seEnviaHoy=' + seEnviaHoy + '&tipoDeAlimento=' + tipoDeAlimento + '&precioEnvio=' + precioEnvio + '&direccionDestino=' + direccionDestino + '&tamanio=' + tamanio + '&fechaCreacionPedido=' + fechaCreacion + '&fechaEstimadaEntrega=' + fechaEntrega, null, {
      responseType: 'text',
    });
  }


  eliminarPaqueteAlimenticio(id: number) {
    return this.http.delete(this.urlbase + '/paquetealimenticio/eliminar?id=' + id, {
      responseType: 'text',
    });
  }


  buscarPorTipoAlimento(tipoDeAlimento: string) {
    return this.http.get<PaquetealimenticioModel[]>(this.urlbase + '/paquetealimenticio/buscarportipodealimento?tipoDeAlimento=' + tipoDeAlimento, {
      observe: 'response',
    });
  }

  buscarPorPrecioEnvio(precioEnvio: number) {
    return this.http.get<PaquetealimenticioModel[]>(this.urlbase + '/paquetealimenticio/buscarporpreciodeenvio?precioEnvio=' + precioEnvio, {
      observe: 'response',
    });
  }
}
