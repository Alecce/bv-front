import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BusinessListDesignedComponent} from './business-list-designed.component';

describe('BusinessListDesignedComponent', () => {
  let component: BusinessListDesignedComponent;
  let fixture: ComponentFixture<BusinessListDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessListDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessListDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
