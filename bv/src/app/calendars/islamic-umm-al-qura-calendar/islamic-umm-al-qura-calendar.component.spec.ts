import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IslamicUmmAlQuraCalendarComponent} from './islamic-umm-al-qura-calendar.component';

describe('IslamicUmmAlQuraCalendarComponent', () => {
  let component: IslamicUmmAlQuraCalendarComponent;
  let fixture: ComponentFixture<IslamicUmmAlQuraCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IslamicUmmAlQuraCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IslamicUmmAlQuraCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
