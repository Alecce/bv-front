import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RegistrationBusinessComponent} from './registration-business.component';

describe('RegistrationBusinessComponent', () => {
  let component: RegistrationBusinessComponent;
  let fixture: ComponentFixture<RegistrationBusinessComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
