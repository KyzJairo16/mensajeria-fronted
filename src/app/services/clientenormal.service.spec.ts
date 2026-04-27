import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Necesario para servicios con HttpClient
import { ClientenormalService } from './clientenormal.service';

describe('ClientenormalService', () => {
  let service: ClientenormalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule // <--- Esto es lo que evita el error del HttpClient
      ],
      providers: [ClientenormalService]
    });

    service = TestBed.inject(ClientenormalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Asegura que no haya peticiones sin responder
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería llamar al endpoint de creación correctamente', () => {
    const nombre = 'Juan';
    const cedula = '123';
    const correo = 'test@test.com';
    const tel = '300';
    const pass = 'abc';

    service.crearClienteNormal(nombre, cedula, correo, tel, pass).subscribe();

    // Verificamos que la URL contenga los parámetros codificados
    const req = httpMock.expectOne(request =>
      request.url.includes('/clientenormal/crear') &&
      request.url.includes('nombre=Juan')
    );

    expect(req.request.method).toBe('POST');
    req.flush('Creado correctamente'); // Simulamos respuesta del servidor
  });
});
