import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KilometrajeCreateComponent } from './kilometraje-create.component';

describe('KilometrajeCreateComponent', () => {
  let component: KilometrajeCreateComponent;
  let fixture: ComponentFixture<KilometrajeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KilometrajeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KilometrajeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
