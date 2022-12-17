import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ShopContactsSubscreenComponent} from './shop-contacts-subscreen.component';

describe('ShopContactsSubscreenComponent', () => {
  let component: ShopContactsSubscreenComponent;
  let fixture: ComponentFixture<ShopContactsSubscreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopContactsSubscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopContactsSubscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
