import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValeGasolinaIndexComponent } from './vale-gasolina-index.component';

describe('ValeGasolinaIndexComponent', () => {
  let component: ValeGasolinaIndexComponent;
  let fixture: ComponentFixture<ValeGasolinaIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValeGasolinaIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValeGasolinaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
