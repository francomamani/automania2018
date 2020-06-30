import { TestBed } from '@angular/core/testing';

import { SuministroCombustibleService } from './suministro-combustible.service';

describe('SuministroCombustibleService', () => {
  let service: SuministroCombustibleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuministroCombustibleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
