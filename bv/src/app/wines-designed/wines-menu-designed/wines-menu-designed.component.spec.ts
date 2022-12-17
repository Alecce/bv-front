import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WinesMenuDesignedComponent} from './wines-menu-designed.component';

describe('WinesMenuDesignedComponent', () => {
  let component: WinesMenuDesignedComponent;
  let fixture: ComponentFixture<WinesMenuDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WinesMenuDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinesMenuDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
