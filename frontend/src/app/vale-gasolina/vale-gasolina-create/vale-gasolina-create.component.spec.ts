import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValeGasolinaCreateComponent } from './vale-gasolina-create.component';

describe('ValeGasolinaCreateComponent', () => {
  let component: ValeGasolinaCreateComponent;
  let fixture: ComponentFixture<ValeGasolinaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValeGasolinaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValeGasolinaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
