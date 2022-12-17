import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CalendarViewBonvinoComponent} from './calendar-view-bonvino.component';

describe('CalendarViewBonvinoComponent', () => {
  let component: CalendarViewBonvinoComponent;
  let fixture: ComponentFixture<CalendarViewBonvinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarViewBonvinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarViewBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
