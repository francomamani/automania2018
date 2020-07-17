import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCombustibleCreateComponent } from './tipo-combustible-create.component';

describe('TipoCombustibleCreateComponent', () => {
  let component: TipoCombustibleCreateComponent;
  let fixture: ComponentFixture<TipoCombustibleCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoCombustibleCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCombustibleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
