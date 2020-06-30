import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KilometrajeComponent } from './kilometraje.component';

describe('KilometrajeComponent', () => {
  let component: KilometrajeComponent;
  let fixture: ComponentFixture<KilometrajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KilometrajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KilometrajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
