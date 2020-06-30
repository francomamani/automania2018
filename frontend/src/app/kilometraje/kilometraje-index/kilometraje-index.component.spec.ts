import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KilometrajeIndexComponent } from './kilometraje-index.component';

describe('KilometrajeIndexComponent', () => {
  let component: KilometrajeIndexComponent;
  let fixture: ComponentFixture<KilometrajeIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KilometrajeIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KilometrajeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
