import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EventDesignedCreateComponent} from './event-designed-create.component';

describe('EventDesignedCreateComponent', () => {
  let component: EventDesignedCreateComponent;
  let fixture: ComponentFixture<EventDesignedCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDesignedCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDesignedCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
