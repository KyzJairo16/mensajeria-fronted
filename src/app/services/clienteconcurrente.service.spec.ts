import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClienteconcurrenteService } from './clienteconcurrente.service';

describe('ClienteconcurrenteService', () => {
  let service: ClienteconcurrenteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClienteconcurrenteService]
    });

    service = TestBed.inject(ClienteconcurrenteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no haya peticiones colgadas entre tests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería realizar una petición GET para mostrar todos los clientes', () => {
    service.getClientesConcurrentes().subscribe();

    const req = httpMock.expectOne(request =>
      request.url.includes('/clienteconcurrente/mostrartodo')
    );

    expect(req.request.method).toBe('GET');
    req.flush([]); // Responde con un array vacío para completar el observable
  });
});
