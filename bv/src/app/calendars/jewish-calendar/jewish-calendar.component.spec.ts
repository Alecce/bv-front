import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JewishCalendarComponent} from './jewish-calendar.component';

describe('JewishCalendarComponent', () => {
  let component: JewishCalendarComponent;
  let fixture: ComponentFixture<JewishCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JewishCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JewishCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
