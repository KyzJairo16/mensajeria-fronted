import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaquetenoalimenticioService } from './paquetenoalimenticio.service';

describe('PaquetenoalimenticioService', () => {
  let service: PaquetenoalimenticioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule // <--- Intercepta las llamadas al puerto 8080
      ],
      providers: [PaquetenoalimenticioService]
    });

    service = TestBed.inject(PaquetenoalimenticioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Asegura que no queden peticiones colgadas
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería enviar los parámetros correctos al crear un paquete no alimenticio', () => {
    const mockIdCliente = 5;
    const esFragil = true;

    service.crearPaqueteNoAlimenticio(mockIdCliente, 'Av. Siempre Viva 742', 'Mediano', 'Springfield', esFragil, false).subscribe();

    const req = httpMock.expectOne(request =>
      request.url.includes('/paquetenoalimenticio/crear')
    );

    expect(req.request.method).toBe('POST');
    // Verificamos los parámetros enviados por HttpParams
    expect(req.request.params.get('idCliente')).toBe(mockIdCliente.toString());
    expect(req.request.params.get('esFragil')).toBe('true');

    req.flush('Paquete no alimenticio creado', { status: 201, statusText: 'Created' });
  });

  it('debería filtrar por estado de fragilidad', () => {
    service.buscarPorEsFragil(true).subscribe();

    const req = httpMock.expectOne(request =>
      request.url.includes('/paquetenoalimenticio/buscarporesfragil') &&
      request.url.includes('esFragil=true')
    );

    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
});
