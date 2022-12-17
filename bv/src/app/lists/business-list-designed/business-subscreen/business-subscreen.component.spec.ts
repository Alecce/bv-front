import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BusinessSubscreenComponent} from './business-subscreen.component';

describe('BusinessSubscreenComponent', () => {
  let component: BusinessSubscreenComponent;
  let fixture: ComponentFixture<BusinessSubscreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessSubscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSubscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
