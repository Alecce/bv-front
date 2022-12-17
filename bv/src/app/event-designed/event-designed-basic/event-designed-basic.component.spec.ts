import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EventDesignedBasicComponent} from './event-designed-basic.component';

describe('EventDesignedBasicComponent', () => {
  let component: EventDesignedBasicComponent;
  let fixture: ComponentFixture<EventDesignedBasicComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDesignedBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDesignedBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
