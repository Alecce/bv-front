import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BusinessDescriptionSubscreenComponent} from './business-description-subscreen.component';

describe('BusinessDescriptionSubscreenComponent', () => {
  let component: BusinessDescriptionSubscreenComponent;
  let fixture: ComponentFixture<BusinessDescriptionSubscreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDescriptionSubscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDescriptionSubscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
