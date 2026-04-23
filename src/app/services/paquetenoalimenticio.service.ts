import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaquetenoalimenticioModel } from '../models/paquetenoalimenticio.model';

@Injectable({
  providedIn: 'root',
})
export class PaquetenoalimenticioService {
  private http = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';

  // Mostrar todos los paquetes no alimenticios
  getPaquetesNoAlimenticios() {
    return this.http.get<PaquetenoalimenticioModel[]>(this.urlbase + '/paquetenoalimenticio/mostrartodo', {
      observe: 'response',
    });
  }


  crearPaqueteNoAlimenticio(esFragil: boolean, precioEnvio: number, direccionDestino: string, tamanio: string, fechaCreacionPedido: Date, fechaEstimadaEntrega: Date) {
    return this.http.post(this.urlbase + '/paquetenoalimenticio/crear?esFragil=' + esFragil + '&precioEnvio=' + precioEnvio + '&direccionDestino=' + direccionDestino + '&tamanio=' + tamanio + '&fechaCreacionPedido=' + fechaCreacionPedido + '&fechaEstimadaEntrega=' + fechaEstimadaEntrega, null, {
      responseType: 'text',
    });
  }


  actualizarPaqueteNoAlimenticio(id: number, esFragil: boolean, precioEnvio: number, direccionDestino: string, tamanio: string, fechaCreacionPedido: Date, fechaEstimadaEntrega: Date) {
    return this.http.put(this.urlbase + '/paquetenoalimenticio/actualizar?id=' + id + '&esFragil=' + esFragil + '&precioEnvio=' + precioEnvio + '&direccionDestino=' + direccionDestino + '&tamanio=' + tamanio + '&fechaCreacionPedido=' + fechaCreacionPedido + '&fechaEstimadaEntrega=' + fechaEstimadaEntrega, null, {
      responseType: 'text',
    });
  }


  eliminarPaqueteNoAlimenticio(id: number) {
    return this.http.delete(this.urlbase + '/paquetenoalimenticio/eliminar?id=' + id, {
      responseType: 'text',
    });
  }


  buscarPorEsFragil(esFragil: boolean) {
    return this.http.get<PaquetenoalimenticioModel[]>(this.urlbase + '/paquetenoalimenticio/buscarporesfragil?esFragil=' + esFragil, {
      observe: 'response',
    });
  }


  buscarPorTamanio(tamanio: string) {
    return this.http.get<PaquetenoalimenticioModel[]>(this.urlbase + '/paquetenoalimenticio/buscarportamanio?tamanio=' + tamanio, {
      observe: 'response',
    });
  }


  buscarPorDireccionDestino(direccionDestino: string) {
    return this.http.get<PaquetenoalimenticioModel[]>(this.urlbase + '/paquetenoalimenticio/buscarpordirecciondestino?direccionDestino=' + direccionDestino, {
      observe: 'response',
    });
  }
}
