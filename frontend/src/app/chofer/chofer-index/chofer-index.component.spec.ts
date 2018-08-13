import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoferIndexComponent } from './chofer-index.component';

describe('ChoferIndexComponent', () => {
  let component: ChoferIndexComponent;
  let fixture: ComponentFixture<ChoferIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoferIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoferIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
