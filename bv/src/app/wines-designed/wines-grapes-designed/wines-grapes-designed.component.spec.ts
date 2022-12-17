import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WinesGrapesDesignedComponent} from './wines-grapes-designed.component';

describe('WinesGrapesDesignedComponent', () => {
  let component: WinesGrapesDesignedComponent;
  let fixture: ComponentFixture<WinesGrapesDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WinesGrapesDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinesGrapesDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
