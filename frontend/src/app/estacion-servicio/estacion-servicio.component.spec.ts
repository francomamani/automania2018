import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacionServicioComponent } from './estacion-servicio.component';

describe('EstacionServicioComponent', () => {
  let component: EstacionServicioComponent;
  let fixture: ComponentFixture<EstacionServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstacionServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstacionServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
