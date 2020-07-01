import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCombustibleEditComponent } from './tipo-combustible-edit.component';

describe('TipoCombustibleEditComponent', () => {
  let component: TipoCombustibleEditComponent;
  let fixture: ComponentFixture<TipoCombustibleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoCombustibleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCombustibleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
