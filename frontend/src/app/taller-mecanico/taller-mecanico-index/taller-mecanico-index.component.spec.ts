import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TallerMecanicoIndexComponent } from './taller-mecanico-index.component';

describe('TallerMecanicoIndexComponent', () => {
  let component: TallerMecanicoIndexComponent;
  let fixture: ComponentFixture<TallerMecanicoIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TallerMecanicoIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TallerMecanicoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
