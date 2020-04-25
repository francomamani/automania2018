import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoferEditComponent } from './chofer-edit.component';

describe('ChoferEditComponent', () => {
  let component: ChoferEditComponent;
  let fixture: ComponentFixture<ChoferEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoferEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoferEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
