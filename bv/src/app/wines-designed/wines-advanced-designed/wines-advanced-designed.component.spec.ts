import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WinesAdvancedDesignedComponent} from './wines-advanced-designed.component';

describe('WinesAdvancedDesignedComponent', () => {
  let component: WinesAdvancedDesignedComponent;
  let fixture: ComponentFixture<WinesAdvancedDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WinesAdvancedDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinesAdvancedDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
