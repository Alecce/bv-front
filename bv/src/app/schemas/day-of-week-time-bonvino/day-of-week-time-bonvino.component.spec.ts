import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DayOfWeekTimeBonvinoComponent} from './day-of-week-time-bonvino.component';

describe('DayOfWeekTimeBonvinoComponent', () => {
  let component: DayOfWeekTimeBonvinoComponent;
  let fixture: ComponentFixture<DayOfWeekTimeBonvinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayOfWeekTimeBonvinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayOfWeekTimeBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
