import { TestBed } from '@angular/core/testing';

import { KilometrajeService } from './kilometraje.service';

describe('KilometrajeService', () => {
  let service: KilometrajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KilometrajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
