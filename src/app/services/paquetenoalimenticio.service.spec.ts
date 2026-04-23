import { TestBed } from '@angular/core/testing';

import { PaquetenoalimenticioService } from './paquetenoalimenticio.service';

describe('PaquetenoalimenticioService', () => {
  let service: PaquetenoalimenticioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaquetenoalimenticioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
