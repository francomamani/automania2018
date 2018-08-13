import { TestBed, inject } from '@angular/core/testing';

import { EstacionServicioService } from './estacion-servicio.service';

describe('EstacionServicioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstacionServicioService]
    });
  });

  it('should be created', inject([EstacionServicioService], (service: EstacionServicioService) => {
    expect(service).toBeTruthy();
  }));
});
