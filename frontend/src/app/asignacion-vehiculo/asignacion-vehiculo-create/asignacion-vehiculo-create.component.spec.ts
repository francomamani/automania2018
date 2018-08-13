import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionVehiculoCreateComponent } from './asignacion-vehiculo-create.component';

describe('AsignacionVehiculoCreateComponent', () => {
  let component: AsignacionVehiculoCreateComponent;
  let fixture: ComponentFixture<AsignacionVehiculoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacionVehiculoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionVehiculoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
