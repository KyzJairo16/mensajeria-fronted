import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaquetenoalimenticioModel } from '../models/paquetenoalimenticio.model';

@Injectable({
  providedIn: 'root',
})
export class PaquetenoalimenticioService {
  private http = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';


  getPaquetesNoAlimenticios() {
    return this.http.get<PaquetenoalimenticioModel[]>(this.urlbase + '/paquetenoalimenticio/mostrartodo', {
      observe: 'response',
    });
  }


  crearPaqueteNoAlimenticio(direccionDestino: string, tamanio: string, ciudadDestino: string, esFragil: boolean) {
    return this.http.post(this.urlbase + '/paquetenoalimenticio/crear?direccionDestino=' + direccionDestino + '&tamanio=' + tamanio + '&ciudadDestino=' +ciudadDestino + '&esFragil=' + esFragil, null, {
      responseType: 'text',
    });
  }


  actualizarPaqueteNoAlimenticio(id: number, direccionDestino: string, ciudadDestino: string, tamanio: string) {
    return this.http.put(this.urlbase + '/paquetenoalimenticio/actualizar?id='+id + '&direccionDestino=' + direccionDestino +'&ciudadDestino=' + ciudadDestino + '&tamanio=' + tamanio, null, {
      responseType: 'text',
    });
  }


  eliminarPaqueteNoAlimenticio(id: number) {
    return this.http.delete(this.urlbase + '/paquetenoalimenticio/eliminar?id=' + id, {
      responseType: 'text',
    });
  }





  buscarPorTamanio(tamanio: string) {
    return this.http.get<PaquetenoalimenticioModel[]>(this.urlbase + '/paquetenoalimenticio/buscarportamanio?tamanio='+tamanio, {
      observe: 'response',
    });
  }

  buscarPorEsFragil(esFragil: boolean) {
    return this.http.get<PaquetenoalimenticioModel[]>(this.urlbase + '/paquetenoalimenticio/buscarporesfragil?esFragil=' + esFragil, {
      observe: 'response',
    });
  }

  buscarPorTamanioYFragil(tamanio: string, esFragil: boolean) {
    return this.http.get<PaquetenoalimenticioModel[]>(this.urlbase + '/paquetenoalimenticio/buscarportamanioyfragil?tamanio='+tamanio+'&esFragil='+esFragil, {
      observe: 'response',
    });
  }

  buscarPorId(id: number) {
    return this.http.get<PaquetenoalimenticioModel>(this.urlbase+'/paquetenoalimenticio/buscarporid?id='+id, {
      observe: 'response',
    });
  }


  buscarDireccionYCiudad(dir: string, ciudad: string) {
    return this.http.get<PaquetenoalimenticioModel[]>(this.urlbase + '/paquetenoalimenticio/buscardireccionyciudad?dir='+dir +'&ciudad=' + ciudad, {
      observe: 'response',
    });
  }
}
