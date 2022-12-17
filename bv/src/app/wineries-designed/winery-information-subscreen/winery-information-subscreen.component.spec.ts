import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WineryInformationSubscreenComponent} from './winery-information-subscreen.component';

describe('WineryInformationSubscreenComponent', () => {
  let component: WineryInformationSubscreenComponent;
  let fixture: ComponentFixture<WineryInformationSubscreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WineryInformationSubscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineryInformationSubscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
