import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WinesServingDesignedComponent} from './wines-serving-designed.component';

describe('WinesServingDesignedComponent', () => {
  let component: WinesServingDesignedComponent;
  let fixture: ComponentFixture<WinesServingDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WinesServingDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinesServingDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
