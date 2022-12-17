import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RegistrationPersonComponent} from './registration-person.component';

describe('RegistrationBusinessComponent', () => {
  let component: RegistrationPersonComponent;
  let fixture: ComponentFixture<RegistrationPersonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
