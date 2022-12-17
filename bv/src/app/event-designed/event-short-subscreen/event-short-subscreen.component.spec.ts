import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EventShortSubscreenComponent} from '@src/app/event-designed/event-short-subscreen/event-short-subscreen.component';

describe('EventShortSubscreenComponent', () => {
  let component: EventShortSubscreenComponent;
  let fixture: ComponentFixture<EventShortSubscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventShortSubscreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventShortSubscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
