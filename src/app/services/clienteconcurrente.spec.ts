import { TestBed } from '@angular/core/testing';

import { ClienteconcurrenteService } from './clienteconcurrente';

describe('Clienteconcurrente', () => {
  let service: ClienteconcurrenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteconcurrenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
