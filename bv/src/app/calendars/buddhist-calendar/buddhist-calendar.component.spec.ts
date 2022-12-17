import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BuddhistCalendarComponent} from './buddhist-calendar.component';

describe('BuddhistCalendarComponent', () => {
  let component: BuddhistCalendarComponent;
  let fixture: ComponentFixture<BuddhistCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuddhistCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuddhistCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
