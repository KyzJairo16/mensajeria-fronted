import { TestBed } from '@angular/core/testing';

import { PaqueteAlimenticioService } from './paquetealimenticio.service';

describe('PaquetealimenticioService', () => {
  let service: PaqueteAlimenticioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaqueteAlimenticioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
