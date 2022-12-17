import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CalendarInputBonvinoComponent} from './calendar-input-bonvino.component';

describe('CalendarInputBonvinoComponent', () => {
  let component: CalendarInputBonvinoComponent;
  let fixture: ComponentFixture<CalendarInputBonvinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarInputBonvinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarInputBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
