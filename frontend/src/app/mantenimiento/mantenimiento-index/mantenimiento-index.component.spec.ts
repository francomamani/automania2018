import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoIndexComponent } from './mantenimiento-index.component';

describe('MantenimientoIndexComponent', () => {
  let component: MantenimientoIndexComponent;
  let fixture: ComponentFixture<MantenimientoIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
