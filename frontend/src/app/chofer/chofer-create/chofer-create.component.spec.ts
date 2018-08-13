import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoferCreateComponent } from './chofer-create.component';

describe('ChoferCreateComponent', () => {
  let component: ChoferCreateComponent;
  let fixture: ComponentFixture<ChoferCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoferCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoferCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
