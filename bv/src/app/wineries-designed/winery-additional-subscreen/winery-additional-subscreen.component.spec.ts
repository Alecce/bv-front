import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WineryAdditionalSubscreenComponent} from './winery-additional-subscreen.component';

describe('WineryAdditionalSubscreenComponent', () => {
  let component: WineryAdditionalSubscreenComponent;
  let fixture: ComponentFixture<WineryAdditionalSubscreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WineryAdditionalSubscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineryAdditionalSubscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
