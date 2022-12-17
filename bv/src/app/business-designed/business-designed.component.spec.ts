import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BusinessDesignedComponent} from './business-designed.component';

describe('BusinessDesignedComponent', () => {
  let component: BusinessDesignedComponent;
  let fixture: ComponentFixture<BusinessDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
