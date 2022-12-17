import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WineListDesignedComponent} from './wine-list-designed.component';

describe('WineListDesignedComponent', () => {
  let component: WineListDesignedComponent;
  let fixture: ComponentFixture<WineListDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WineListDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineListDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
