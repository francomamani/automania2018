import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionVehiculoEditComponent } from './asignacion-vehiculo-edit.component';

describe('AsignacionVehiculoEditComponent', () => {
  let component: AsignacionVehiculoEditComponent;
  let fixture: ComponentFixture<AsignacionVehiculoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacionVehiculoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionVehiculoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
