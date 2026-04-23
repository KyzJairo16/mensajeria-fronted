import { TestBed } from '@angular/core/testing';

import { PaquetecartaService } from './paquetecarta.service';

describe('PaquetecartaService', () => {
  let service: PaquetecartaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaquetecartaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
