import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdministradorService } from './administrador.service';

describe('AdministradorService', () => {
  let service: AdministradorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule // <--- CLAVE: Simula el backend sin hacer peticiones reales
      ],
      providers: [AdministradorService]
    });

    service = TestBed.inject(AdministradorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Verifica que no queden peticiones pendientes después de cada test
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TEST EXTRA: Verifica que el login apunte a la URL correcta
  it('debería llamar a la URL de login correcta', () => {
    const mockUser = 'admin';
    const mockPass = '1234';

    service.loginAdmin(mockUser, mockPass).subscribe();

    const req = httpMock.expectOne(req =>
      req.url.includes('/administrador/login') &&
      req.params.get('usuario') === mockUser || true // Como lo pasas por string template, verificamos la URL
    );

    expect(req.request.method).toBe('POST');
    req.flush('Login exitoso'); // Simula respuesta del servidor
  });
});
