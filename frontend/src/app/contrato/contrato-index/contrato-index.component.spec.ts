import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoIndexComponent } from './contrato-index.component';

describe('ContratoIndexComponent', () => {
  let component: ContratoIndexComponent;
  let fixture: ComponentFixture<ContratoIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
