import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EventShortDesignedComponent} from '@src/app/event-designed/event-short-designed/event-short-designed.component';

describe('EventShortDesignedComponent', () => {
  let component: EventShortDesignedComponent;
  let fixture: ComponentFixture<EventShortDesignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventShortDesignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventShortDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
