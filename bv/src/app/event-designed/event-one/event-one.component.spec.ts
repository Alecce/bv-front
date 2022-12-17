import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EventOneComponent} from './event-one.component';

describe('EventOneComponent', () => {
  let component: EventOneComponent;
  let fixture: ComponentFixture<EventOneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
