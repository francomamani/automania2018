import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TallerMecanicoCreateComponent } from './taller-mecanico-create.component';

describe('TallerMecanicoCreateComponent', () => {
  let component: TallerMecanicoCreateComponent;
  let fixture: ComponentFixture<TallerMecanicoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TallerMecanicoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TallerMecanicoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
