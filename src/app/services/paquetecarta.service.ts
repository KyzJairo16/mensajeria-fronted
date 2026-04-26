import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaquetecartaModel } from '../models/paquetecarta.model';

@Injectable({
  providedIn: 'root',
})
export class PaquetecartaService {
  private http = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';


  getPaquetesCartas() {
    return this.http.get<PaquetecartaModel[]>(this.urlbase + '/paquetecarta/mostrartodo', {
      observe: 'response',
    });
  }


  crearPaqueteCarta(direccionDestino: string, tamanio: string, ciudadDestino: string, tipoCarta: string) {
    return this.http.post(this.urlbase + '/paquetecarta/crear?direccionDestino=' + direccionDestino + '&tamanio=' + tamanio + '&ciudadDestino=' + ciudadDestino + '&tipoCarta=' + tipoCarta, null, {
      responseType: 'text',
    });
  }


  actualizarPaqueteCarta(id: number, direccionDestino: string, ciudadDestino: string, tamanio: string, tipoCarta: string) {
    return this.http.put(this.urlbase + '/paquetecarta/actualizar?id=' + id + '&direccionDestino=' + direccionDestino + '&ciudadDestino=' + ciudadDestino + '&tamanio=' + tamanio + '&tipoCarta=' + tipoCarta, null, {
      responseType: 'text',
    });
  }


  eliminarPaqueteCarta(id: number) {
    return this.http.delete(this.urlbase + '/paquetecarta/eliminar?id=' + id, {
      responseType: 'text',
    });
  }


  buscarPorTamanio(tamanio: string) {
    return this.http.get<PaquetecartaModel[]>(this.urlbase + '/paquetecarta/buscarportamanio?tamanio=' + tamanio, {
      observe: 'response',
    });
  }


  buscarPorTipoCarta(tipoCarta: string) {
    return this.http.get<PaquetecartaModel[]>(this.urlbase + '/paquetecarta/buscarportipocarta?tipoCarta=' + tipoCarta, {
      observe: 'response',
    });
  }


  buscarPorTamanioYTipoCarta(tamanio: string, tipoCarta: string) {
    return this.http.get<PaquetecartaModel[]>(this.urlbase + '/paquetecarta/buscarportamanioytipocarta?tamanio=' + tamanio + '&tipoCarta=' + tipoCarta, {
      observe: 'response',
    });
  }


  buscarPorId(id: number) {
    return this.http.get<PaquetecartaModel>(this.urlbase + '/paquetecarta/buscarporid?id=' + id, {
      observe: 'response',
    });
  }


  buscarDireccionYCiudad(dir: string, ciudad: string) {
    return this.http.get<PaquetecartaModel[]>(this.urlbase + '/paquetecarta/buscardireccionyciudad?dir=' + dir + '&ciudad=' + ciudad, {
      observe: 'response',
    });
  }
}
