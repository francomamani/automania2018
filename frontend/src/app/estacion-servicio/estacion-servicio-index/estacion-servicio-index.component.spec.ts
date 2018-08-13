import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacionServicioIndexComponent } from './estacion-servicio-index.component';

describe('EstacionServicioIndexComponent', () => {
  let component: EstacionServicioIndexComponent;
  let fixture: ComponentFixture<EstacionServicioIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstacionServicioIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstacionServicioIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
