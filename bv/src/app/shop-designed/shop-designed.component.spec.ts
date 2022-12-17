import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ShopDesignedComponent} from './shop-designed.component';

describe('ShopDesignedComponent', () => {
  let component: ShopDesignedComponent;
  let fixture: ComponentFixture<ShopDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
