import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WineryContactsSubscreenComponent} from './winery-contacts-subscreen.component';

describe('WineryContactsSubscreenComponent', () => {
  let component: WineryContactsSubscreenComponent;
  let fixture: ComponentFixture<WineryContactsSubscreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WineryContactsSubscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineryContactsSubscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
