import { inject, Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { PaquetealimenticioModel } from '../models/paquetealimenticio.model';
import { PaquetecartaModel } from '../models/paquetecarta.model';

@Injectable({
  providedIn: 'root',
})
export class PaquetealimenticioService {
  private http = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';


  getPaquetesAlimenticios() {
    return this.http.get<PaquetealimenticioModel[]>(this.urlbase + '/paquetealimenticio/mostrartodo', {
      observe: 'response',
    });
  }


  crearPaqueteAlimenticio(
    direccionDestino: string,
    tamanio: string,
    ciudadDestino: string,
    idCliente: number,
    tipoDeAlimento: string,
    esPrioritario:boolean,
  ) {

    const params = new HttpParams()
      .set('direccionDestino', direccionDestino)
      .set('tamanio', tamanio)
      .set('ciudadDestino', ciudadDestino)
      .set('idCliente', idCliente.toString())
      .set('seEnviaHoy', 'true')
      .set('tipoDeAlimento', tipoDeAlimento)
      .set('esPrioritario', esPrioritario.toString());

    console.log({
      idCliente,
      direccionDestino,
      tamanio,
      ciudadDestino,
      tipoDeAlimento,
      esPrioritario,
      urlCompleta: `${this.urlbase}/paquetecarta/crear?${params.toString()}`
    });
    return this.http.post(this.urlbase + '/paquetealimenticio/crear', null, {
      params: params,
      responseType: 'text',
      observe: 'response'
    });
  }


  actualizarPaqueteAlimenticio(id: number, direccionDestino: string, ciudadDestino: string, tamanio: string, tipoDeAlimento: string) {
    return this.http.put(this.urlbase + '/paquetealimenticio/actualizar?id=' + id + '&direccionDestino=' + direccionDestino + '&ciudadDestino=' + ciudadDestino + '&tamanio=' + tamanio + '&tipoDeAlimento=' + tipoDeAlimento, null, {
      responseType: 'text',
    });
  }


  eliminarPaqueteAlimenticio(id: number) {
    return this.http.delete(this.urlbase + '/paquetealimenticio/eliminar?id=' + id, {
      responseType: 'text',
    });
  }


  buscarPorTamanio(tamanio: string) {
    return this.http.get<PaquetealimenticioModel[]>(this.urlbase + '/paquetealimenticio/buscartamanio?tamanio=' + tamanio, {
      observe: 'response',
    });
  }

  buscarPorSeEnviaHoy(seEnviaHoy: boolean) {
    return this.http.get<PaquetealimenticioModel[]>(this.urlbase + '/paquetealimenticio/buscarporenviahoy?seEnviaHoy=' + seEnviaHoy, {
      observe: 'response',
    });
  }

  buscarPorTipoDeAlimento(tipoDeAlimento: string) {
    return this.http.get<PaquetealimenticioModel[]>(this.urlbase + '/paquetealimenticio/buscarportipoalimento?tipoDeAlimento=' + tipoDeAlimento, {
      observe: 'response',
    });
  }

  buscarPorTamanioYTipo(tamanio: string, tipoDeAlimento: string) {
    return this.http.get<PaquetealimenticioModel[]>(this.urlbase + '/paquetealimenticio/buscarportamanioytipo?tamanio=' + tamanio + '&tipoDeAlimento=' + tipoDeAlimento, {
      observe: 'response',
    });
  }

  buscarPorId(id: number) {
    return this.http.get<PaquetealimenticioModel>(this.urlbase + '/paquetealimenticio/buscarPorId?id=' + id, {
      observe: 'response',
    });
  }

  buscarDireccionYCiudad(dir: string, ciudad: string) {
    return this.http.get<PaquetealimenticioModel[]>(this.urlbase + '/paquetealimenticio/buscardireccionyciudad?dir=' + dir + '&ciudad=' + ciudad, {
      observe: 'response',
    });
  }

  verHistorial(idCliente: number) {
    return this.http.get<PaquetealimenticioModel[]>(
      this.urlbase + '/paquetealimenticio/historialporid?idCliente=' +idCliente,
      { observe: 'response' }
    );
  }
}
