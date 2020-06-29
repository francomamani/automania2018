import { TestBed } from '@angular/core/testing';

import { ValeGasolinaService } from './vale-gasolina.service';

describe('ValeGasolinaService', () => {
  let service: ValeGasolinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValeGasolinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
