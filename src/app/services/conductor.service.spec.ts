import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConductorService } from './conductor.service';

describe('ConductorService', () => {
  let service: ConductorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule // <--- Esto simula el backend de Spring Boot
      ],
      providers: [ConductorService]
    });

    service = TestBed.inject(ConductorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no haya peticiones "vivas" al terminar cada test
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener la lista de conductores mediante GET', () => {
    service.getConductores().subscribe();

    const req = httpMock.expectOne(request =>
      request.url.includes('/conductor/mostrartodo')
    );

    expect(req.request.method).toBe('GET');
    req.flush([]); // Simula respuesta exitosa
  });

  it('debería llamar a la URL de eliminar con el ID correcto', () => {
    const idEliminar = 5;
    service.eliminarConductor(idEliminar).subscribe();

    const req = httpMock.expectOne(request =>
      request.url.includes('/conductor/eliminar') && request.url.includes('id=5')
    );

    expect(req.request.method).toBe('DELETE');
    req.flush('Eliminado');
  });
});
