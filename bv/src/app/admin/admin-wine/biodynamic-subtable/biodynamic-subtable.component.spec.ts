import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BiodynamicSubtableComponent} from './biodynamic-subtable.component';

describe('BiodynamicSubtableComponent', () => {
  let component: BiodynamicSubtableComponent;
  let fixture: ComponentFixture<BiodynamicSubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BiodynamicSubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiodynamicSubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
