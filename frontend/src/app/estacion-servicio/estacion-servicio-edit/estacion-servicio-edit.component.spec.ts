import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacionServicioEditComponent } from './estacion-servicio-edit.component';

describe('EstacionServicioEditComponent', () => {
  let component: EstacionServicioEditComponent;
  let fixture: ComponentFixture<EstacionServicioEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstacionServicioEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstacionServicioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
