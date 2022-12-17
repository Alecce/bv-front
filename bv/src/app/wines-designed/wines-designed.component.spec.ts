import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WinesDesignedComponent} from './wines-designed.component';

describe('WinesDesignedComponent', () => {
  let component: WinesDesignedComponent;
  let fixture: ComponentFixture<WinesDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WinesDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinesDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
