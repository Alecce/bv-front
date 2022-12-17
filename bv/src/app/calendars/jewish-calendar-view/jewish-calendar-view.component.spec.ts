import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JewishCalendarViewComponent} from './jewish-calendar-view.component';

describe('JewishCalendarViewComponent', () => {
  let component: JewishCalendarViewComponent;
  let fixture: ComponentFixture<JewishCalendarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JewishCalendarViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JewishCalendarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
