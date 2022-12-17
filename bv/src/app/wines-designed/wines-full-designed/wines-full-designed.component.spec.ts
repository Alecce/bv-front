import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WinesFullDesignedComponent} from './wines-full-designed.component';

describe('WinesFullDesignedComponent', () => {
  let component: WinesFullDesignedComponent;
  let fixture: ComponentFixture<WinesFullDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WinesFullDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinesFullDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
