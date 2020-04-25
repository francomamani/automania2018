import { TestBed, inject } from '@angular/core/testing';

import { AsignacionVehiculoService } from './asignacion-vehiculo.service';

describe('AsignacionVehiculoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsignacionVehiculoService]
    });
  });

  it('should be created', inject([AsignacionVehiculoService], (service: AsignacionVehiculoService) => {
    expect(service).toBeTruthy();
  }));
});
