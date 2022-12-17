import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ShopInformationSubscreenComponent} from './shop-information-subscreen.component';

describe('ShopInformationSubscreenComponent', () => {
  let component: ShopInformationSubscreenComponent;
  let fixture: ComponentFixture<ShopInformationSubscreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopInformationSubscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopInformationSubscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
