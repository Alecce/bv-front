import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EventDesignedMenuComponent} from './event-designed-menu.component';

describe('EventDesignedMenuComponent', () => {
  let component: EventDesignedMenuComponent;
  let fixture: ComponentFixture<EventDesignedMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDesignedMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDesignedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
