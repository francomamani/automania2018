import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioGeneralComponent } from './servicio-general.component';

describe('ServicioGeneralComponent', () => {
  let component: ServicioGeneralComponent;
  let fixture: ComponentFixture<ServicioGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
