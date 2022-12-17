import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LoginDesignedComponent} from './login-designed.component';

describe('LoginDesignedComponent', () => {
  let component: LoginDesignedComponent;
  let fixture: ComponentFixture<LoginDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
