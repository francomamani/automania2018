import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TallerMecanicoEditComponent } from './taller-mecanico-edit.component';

describe('TallerMecanicoEditComponent', () => {
  let component: TallerMecanicoEditComponent;
  let fixture: ComponentFixture<TallerMecanicoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TallerMecanicoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TallerMecanicoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
