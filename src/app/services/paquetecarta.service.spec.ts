import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaquetecartaService } from './paquetecarta.service';

describe('PaquetecartaService', () => {
  let service: PaquetecartaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [PaquetecartaService]
    });

    service = TestBed.inject(PaquetecartaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {

    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería enviar los parámetros correctos al crear una carta', () => {
    const mockId = 1;
    const mockCiudad = 'Medellín';

    service.crearPaqueteCarta(mockId, 'Calle Falsa 123', 'Sobre', mockCiudad, 'Urgente', true).subscribe();

    const req = httpMock.expectOne(request =>
      request.url.includes('/paquetecarta/crear')
    );

    expect(req.request.method).toBe('POST');
    // Validamos que los parámetros en la URL sean los correctos
    expect(req.request.params.get('ciudadDestino')).toBe(mockCiudad);
    expect(req.request.params.get('tipoCarta')).toBe('Urgente');

    req.flush('Carta creada con éxito', { status: 201, statusText: 'Created' });
  });

  it('debería consultar el historial por ID de cliente', () => {
    const idCliente = 99;
    service.verHistorial(idCliente).subscribe();

    const req = httpMock.expectOne(request =>
      request.url.includes('/paquetecarta/historialporid') &&
      request.url.includes(`idCliente=${idCliente}`)
    );

    expect(req.request.method).toBe('GET');
    req.flush([]); // Simula historial vacío
  });
});
