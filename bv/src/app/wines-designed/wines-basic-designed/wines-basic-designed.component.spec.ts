import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WinesBasicDesignedComponent} from './wines-basic-designed.component';

describe('WinesBasicDesignedComponent', () => {
  let component: WinesBasicDesignedComponent;
  let fixture: ComponentFixture<WinesBasicDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WinesBasicDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinesBasicDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
