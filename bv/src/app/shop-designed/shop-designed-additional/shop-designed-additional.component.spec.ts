import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ShopDesignedAdditionalComponent} from './shop-designed-additional.component';

describe('ShopDesignedAdditionalComponent', () => {
  let component: ShopDesignedAdditionalComponent;
  let fixture: ComponentFixture<ShopDesignedAdditionalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDesignedAdditionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDesignedAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
