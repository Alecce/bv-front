import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {NavigationDesignedComponent} from './navigation-designed.component';

describe('NavigationDesignedComponent', () => {
  let component: NavigationDesignedComponent;
  let fixture: ComponentFixture<NavigationDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
