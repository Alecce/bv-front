import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AutodescriptionDesignedComponent} from './autodescription-designed.component';

describe('AutodescriptionDesignedComponent', () => {
  let component: AutodescriptionDesignedComponent;
  let fixture: ComponentFixture<AutodescriptionDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AutodescriptionDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutodescriptionDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
