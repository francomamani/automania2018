import { TestBed, inject } from '@angular/core/testing';

import { TallerMecanicoService } from './taller-mecanico.service';

describe('TallerMecanicoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TallerMecanicoService]
    });
  });

  it('should be created', inject([TallerMecanicoService], (service: TallerMecanicoService) => {
    expect(service).toBeTruthy();
  }));
});
