import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KilometrajeEditComponent } from './kilometraje-edit.component';

describe('KilometrajeEditComponent', () => {
  let component: KilometrajeEditComponent;
  let fixture: ComponentFixture<KilometrajeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KilometrajeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KilometrajeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
