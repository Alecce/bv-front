import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AccauntDesignedComponent} from './accaunt-designed.component';

describe('AccauntDesignedComponent', () => {
  let component: AccauntDesignedComponent;
  let fixture: ComponentFixture<AccauntDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccauntDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccauntDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
