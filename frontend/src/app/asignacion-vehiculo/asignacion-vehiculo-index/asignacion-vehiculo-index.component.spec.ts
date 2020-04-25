import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionVehiculoIndexComponent } from './asignacion-vehiculo-index.component';

describe('AsignacionVehiculoIndexComponent', () => {
  let component: AsignacionVehiculoIndexComponent;
  let fixture: ComponentFixture<AsignacionVehiculoIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacionVehiculoIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionVehiculoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
