import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WinesStoreSubscreenComponent} from './wines-store-subscreen.component';

describe('WinesStoreSubscreenComponent', () => {
  let component: WinesStoreSubscreenComponent;
  let fixture: ComponentFixture<WinesStoreSubscreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WinesStoreSubscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinesStoreSubscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
