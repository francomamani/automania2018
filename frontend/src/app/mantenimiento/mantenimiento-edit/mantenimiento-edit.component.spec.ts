import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoEditComponent } from './mantenimiento-edit.component';

describe('MantenimientoEditComponent', () => {
  let component: MantenimientoEditComponent;
  let fixture: ComponentFixture<MantenimientoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
