import { TestBed, inject } from '@angular/core/testing';

import { MantenimientoService } from './mantenimiento.service';

describe('MantenimientoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MantenimientoService]
    });
  });

  it('should be created', inject([MantenimientoService], (service: MantenimientoService) => {
    expect(service).toBeTruthy();
  }));
});
