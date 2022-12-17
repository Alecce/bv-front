import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WineOneDesignedComponent} from './wine-one-designed.component';

describe('WineOneDesignedComponent', () => {
  let component: WineOneDesignedComponent;
  let fixture: ComponentFixture<WineOneDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WineOneDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineOneDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
