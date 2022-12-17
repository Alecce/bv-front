import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EventDesignedComponent} from './event-designed.component';

describe('EventDesignedComponent', () => {
  let component: EventDesignedComponent;
  let fixture: ComponentFixture<EventDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
