import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuministroCombustibleComponent } from './suministro-combustible.component';

describe('SuministroCombustibleComponent', () => {
  let component: SuministroCombustibleComponent;
  let fixture: ComponentFixture<SuministroCombustibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuministroCombustibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuministroCombustibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
