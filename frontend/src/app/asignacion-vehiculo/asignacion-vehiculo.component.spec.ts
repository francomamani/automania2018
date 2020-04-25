import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionVehiculoComponent } from './asignacion-vehiculo.component';

describe('AsignacionVehiculoComponent', () => {
  let component: AsignacionVehiculoComponent;
  let fixture: ComponentFixture<AsignacionVehiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacionVehiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
