import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValeGasolinaComponent } from './vale-gasolina.component';

describe('ValeGasolinaComponent', () => {
  let component: ValeGasolinaComponent;
  let fixture: ComponentFixture<ValeGasolinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValeGasolinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValeGasolinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
