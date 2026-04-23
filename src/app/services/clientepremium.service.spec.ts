import { TestBed } from '@angular/core/testing';

import { ClientepremiumService } from './clientepremium.service';

describe('ClientepremiumService', () => {
  let service: ClientepremiumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientepremiumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
