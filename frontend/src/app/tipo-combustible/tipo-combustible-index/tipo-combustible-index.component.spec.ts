import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCombustibleIndexComponent } from './tipo-combustible-index.component';

describe('TipoCombustibleIndexComponent', () => {
  let component: TipoCombustibleIndexComponent;
  let fixture: ComponentFixture<TipoCombustibleIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoCombustibleIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCombustibleIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
