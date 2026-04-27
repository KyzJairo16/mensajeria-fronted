import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientepremiumService } from './clientepremium.service';

describe('ClientepremiumService', () => {
  let service: ClientepremiumService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ClientepremiumService]
    });

    service = TestBed.inject(ClientepremiumService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {

    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería solicitar la lista de clientes premium mediante GET', () => {
    service.getClientesPremium().subscribe();

    const req = httpMock.expectOne(request =>
      request.url.includes('/clientepremium/mostrartodo')
    );

    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
});
