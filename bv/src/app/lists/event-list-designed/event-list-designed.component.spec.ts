import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EventListDesignedComponent} from './event-list-designed.component';

describe('EventListDesignedComponent', () => {
  let component: EventListDesignedComponent;
  let fixture: ComponentFixture<EventListDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventListDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
