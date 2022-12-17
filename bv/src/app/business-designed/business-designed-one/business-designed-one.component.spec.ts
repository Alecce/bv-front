import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BusinessDesignedOneComponent} from './business-designed-one.component';

describe('BusinessDesignedOneComponent', () => {
  let component: BusinessDesignedOneComponent;
  let fixture: ComponentFixture<BusinessDesignedOneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDesignedOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDesignedOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
