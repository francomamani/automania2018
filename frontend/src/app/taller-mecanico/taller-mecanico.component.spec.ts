import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TallerMecanicoComponent } from './taller-mecanico.component';

describe('TallerMecanicoComponent', () => {
  let component: TallerMecanicoComponent;
  let fixture: ComponentFixture<TallerMecanicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TallerMecanicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TallerMecanicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
