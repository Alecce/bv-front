import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SuperlistDesignedComponent} from './superlist-designed.component';

describe('SuperlistDesignedComponent', () => {
  let component: SuperlistDesignedComponent;
  let fixture: ComponentFixture<SuperlistDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperlistDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperlistDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
