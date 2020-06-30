import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuministroCombustibleEditComponent } from './suministro-combustible-edit.component';

describe('SuministroCombustibleEditComponent', () => {
  let component: SuministroCombustibleEditComponent;
  let fixture: ComponentFixture<SuministroCombustibleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuministroCombustibleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuministroCombustibleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
