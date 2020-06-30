import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuministroCombustibleCreateComponent } from './suministro-combustible-create.component';

describe('SuministroCombustibleCreateComponent', () => {
  let component: SuministroCombustibleCreateComponent;
  let fixture: ComponentFixture<SuministroCombustibleCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuministroCombustibleCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuministroCombustibleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
