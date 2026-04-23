import { TestBed } from '@angular/core/testing';

import { ClientenormalService } from './clientenormal.service';

describe('ClientenormalService', () => {
  let service: ClientenormalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientenormalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
