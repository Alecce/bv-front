import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EventDesignedAdditionalComponent} from './event-designed-additional.component';

describe('EventDesignedAdditionalComponent', () => {
  let component: EventDesignedAdditionalComponent;
  let fixture: ComponentFixture<EventDesignedAdditionalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDesignedAdditionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDesignedAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
