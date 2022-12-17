import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ShopDesignedMenuComponent} from './shop-designed-menu.component';

describe('ShopDesignedMenuComponent', () => {
  let component: ShopDesignedMenuComponent;
  let fixture: ComponentFixture<ShopDesignedMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDesignedMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDesignedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
