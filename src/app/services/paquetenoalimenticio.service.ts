import { inject, Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
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


  crearPaqueteNoAlimenticio(
    idCliente: number,
    direccionDestino: string,
    tamanio: string,
    ciudadDestino: string,
    esFragil: boolean,
    esPrioritario:boolean,

  ) {
    const params = new HttpParams()
      .set('idCliente', idCliente.toString())
      .set('direccionDestino', direccionDestino)
      .set('tamanio', tamanio)
      .set('ciudadDestino', ciudadDestino)
      .set('esFragil', esFragil.toString())
      .set('esPrioritario', esPrioritario.toString());

    console.log({
      idCliente,
      direccionDestino,
      tamanio,
      ciudadDestino,
      esFragil,
      esPrioritario,
      urlCompleta: `${this.urlbase}/paquetecarta/crear?${params.toString()}`
    });
    return this.http.post(this.urlbase + '/paquetenoalimenticio/crear', null, {
      params: params,
      responseType: 'text',
      observe: 'response'
    });
  }


  actualizarPaqueteNoAlimenticio(id: number, direccionDestino: string, ciudadDestino: string, tamanio: string) {
    return this.http.put(this.urlbase + '/paquetenoalimenticio/actualizar?id=' + id + '&direccionDestino=' + direccionDestino + '&ciudadDestino=' + ciudadDestino + '&tamanio=' + tamanio, null, {
      responseType: 'text',
    });
  }


  eliminarPaqueteNoAlimenticio(id: number) {
    return this.http.delete(this.urlbase + '/paquetenoalimenticio/eliminar?id=' + id, {
      responseType: 'text',
    });
  }


  buscarPorTamanio(tamanio: string) {
    return this.http.get<PaquetenoalimenticioModel[]>(this.urlbase + '/paquetenoalimenticio/buscarportamanio?tamanio=' + tamanio, {
      observe: 'response',
    });
  }

  buscarPorEsFragil(esFragil: boolean) {
    return this.http.get<PaquetenoalimenticioModel[]>(this.urlbase + '/paquetenoalimenticio/buscarporesfragil?esFragil=' + esFragil, {
      observe: 'response',
    });
  }

  buscarPorTamanioYFragil(tamanio: string, esFragil: boolean) {
    return this.http.get<PaquetenoalimenticioModel[]>(this.urlbase + '/paquetenoalimenticio/buscarportamanioyfragil?tamanio=' + tamanio + '&esFragil=' + esFragil, {
      observe: 'response',
    });
  }

  buscarPorId(id: number) {
    return this.http.get<PaquetenoalimenticioModel>(this.urlbase + '/paquetenoalimenticio/buscarporid?id=' + id, {
      observe: 'response',
    });
  }

  buscarDireccionYCiudad(dir: string, ciudad: string) {
    return this.http.get<PaquetenoalimenticioModel[]>(this.urlbase + '/paquetenoalimenticio/buscardireccionyciudad?dir=' + dir + '&ciudad=' + ciudad, {
      observe: 'response',
    });
  }
}
