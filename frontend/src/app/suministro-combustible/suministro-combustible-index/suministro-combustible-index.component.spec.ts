import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuministroCombustibleIndexComponent } from './suministro-combustible-index.component';

describe('SuministroCombustibleIndexComponent', () => {
  let component: SuministroCombustibleIndexComponent;
  let fixture: ComponentFixture<SuministroCombustibleIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuministroCombustibleIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuministroCombustibleIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
