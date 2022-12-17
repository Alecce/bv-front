import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ShopDesignedOneComponent} from './shop-designed-one.component';

describe('ShopDesignedOneComponent', () => {
  let component: ShopDesignedOneComponent;
  let fixture: ComponentFixture<ShopDesignedOneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDesignedOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDesignedOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
