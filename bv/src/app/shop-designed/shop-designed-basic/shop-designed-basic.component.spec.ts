import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ShopDesignedBasicComponent} from './shop-designed-basic.component';

describe('ShopDesignedBasicComponent', () => {
  let component: ShopDesignedBasicComponent;
  let fixture: ComponentFixture<ShopDesignedBasicComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDesignedBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDesignedBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
