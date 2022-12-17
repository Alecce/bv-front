import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RegistrationSubtableComponent} from './registration-subtable.component';

describe('RegistrationSubtableComponent', () => {
  let component: RegistrationSubtableComponent;
  let fixture: ComponentFixture<RegistrationSubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationSubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationSubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
