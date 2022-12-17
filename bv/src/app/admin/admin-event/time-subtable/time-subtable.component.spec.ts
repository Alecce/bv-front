import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TimeSubtableComponent} from './time-subtable.component';

describe('TimeSubtableComponent', () => {
  let component: TimeSubtableComponent;
  let fixture: ComponentFixture<TimeSubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
