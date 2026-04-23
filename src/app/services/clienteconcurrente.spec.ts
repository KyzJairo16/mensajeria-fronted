import { TestBed } from '@angular/core/testing';

import { Clienteconcurrente } from './clienteconcurrente';

describe('Clienteconcurrente', () => {
  let service: Clienteconcurrente;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Clienteconcurrente);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
