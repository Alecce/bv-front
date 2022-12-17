import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WineryOneDesignedComponent} from './winery-one-designed.component';

describe('WineryOneDesignedComponent', () => {
  let component: WineryOneDesignedComponent;
  let fixture: ComponentFixture<WineryOneDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WineryOneDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineryOneDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
