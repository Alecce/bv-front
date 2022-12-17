import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LoginSubtableComponent} from './login-subtable.component';

describe('LoginSubtableComponent', () => {
  let component: LoginSubtableComponent;
  let fixture: ComponentFixture<LoginSubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
