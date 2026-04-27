import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ManipuladordepaqueteService } from './manipuladordepaquete.service';

describe('ManipuladordepaqueteService', () => {
  let service: ManipuladordepaqueteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ManipuladordepaqueteService]
    });

    service = TestBed.inject(ManipuladordepaqueteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que todas las peticiones se hayan resuelto
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener todos los manipuladores mediante GET', () => {
    service.getManipuladores().subscribe();

    const req = httpMock.expectOne(request =>
      request.url.includes('/manipuladordepaquete/mostrartodo')
    );

    expect(req.request.method).toBe('GET');
    req.flush([]); // Simula respuesta de API
  });

  it('debería enviar los parámetros correctos al crear un manipulador', () => {
    const nombre = 'Carlos';
    const tipo = 'Carga';

    service.crearManipulador(nombre, '123', 'c@c.com', '555', 'M', tipo).subscribe();

    const req = httpMock.expectOne(request =>
      request.url.includes('/manipuladordepaquete/crear') &&
      request.url.includes('nombre=Carlos') &&
      request.url.includes('tipoManipulador=Carga')
    );

    expect(req.request.method).toBe('POST');
    req.flush('Éxito');
  });
});
