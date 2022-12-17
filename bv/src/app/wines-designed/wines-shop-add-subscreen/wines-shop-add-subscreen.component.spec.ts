import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WinesShopAddSubscreenComponent} from '@src/app/wines-designed/wines-shop-add-subscreen/wines-shop-add-subscreen.component';

describe('WinesShopAddSubscreenComponent', () => {
  let component: WinesShopAddSubscreenComponent;
  let fixture: ComponentFixture<WinesShopAddSubscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinesShopAddSubscreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WinesShopAddSubscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
