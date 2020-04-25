import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacionServicioCreateComponent } from './estacion-servicio-create.component';

describe('EstacionServicioCreateComponent', () => {
  let component: EstacionServicioCreateComponent;
  let fixture: ComponentFixture<EstacionServicioCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstacionServicioCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstacionServicioCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
