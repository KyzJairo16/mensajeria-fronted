import { TestBed } from '@angular/core/testing';

import { ManipuladordepaqueteService } from './manipuladordepaquete.service';

describe('ManipuladordepaqueteService', () => {
  let service: ManipuladordepaqueteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManipuladordepaqueteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
