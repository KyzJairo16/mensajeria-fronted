import { TestBed } from '@angular/core/testing';

import { PaquetealimenticioService } from './paquetealimenticio.service';

describe('PaquetealimenticioService', () => {
  let service: PaquetealimenticioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaquetealimenticioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
