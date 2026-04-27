import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaquetealimenticioService } from './paquetealimenticio.service';

describe('PaquetealimenticioService', () => {
  let service: PaquetealimenticioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule // <--- Simula el backend de Spring Boot
      ],
      providers: [PaquetealimenticioService]
    });

    service = TestBed.inject(PaquetealimenticioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no haya peticiones sin responder
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería enviar los parámetros correctos al crear un paquete alimenticio', () => {
    service.crearPaqueteAlimenticio('Calle 123', 'Grande', 'Bogotá', 1, 'Fruta', true).subscribe();

    // Verificamos la petición POST
    const req = httpMock.expectOne(request =>
      request.url.includes('/paquetealimenticio/crear')
    );

    expect(req.request.method).toBe('POST');
    // Verificamos que los params se hayan enviado correctamente
    expect(req.request.params.get('tipoDeAlimento')).toBe('Fruta');
    expect(req.request.params.get('ciudadDestino')).toBe('Bogotá');

    req.flush('Paquete creado', { status: 201, statusText: 'Created' });
  });

  it('debería buscar por ID correctamente', () => {
    service.buscarPorId(10).subscribe();

    const req = httpMock.expectOne(request =>
      request.url.includes('/paquetealimenticio/buscarPorId') &&
      request.url.includes('id=10')
    );

    expect(req.request.method).toBe('GET');
    req.flush({ id: 10, tipoDeAlimento: 'Perecedero' });
  });
});
