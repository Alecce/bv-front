import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProfileDesignedComponent} from './profile-designed.component';

describe('ProfileDesignedComponent', () => {
  let component: ProfileDesignedComponent;
  let fixture: ComponentFixture<ProfileDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
