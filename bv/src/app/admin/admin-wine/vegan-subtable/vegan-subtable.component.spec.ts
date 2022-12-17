import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {VeganSubtableComponent} from './vegan-subtable.component';

describe('VeganSubtableComponent', () => {
  let component: VeganSubtableComponent;
  let fixture: ComponentFixture<VeganSubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VeganSubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeganSubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
