import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WineryAdditionalComponent} from './winery-additional.component';

describe('WineryAdditionalComponent', () => {
  let component: WineryAdditionalComponent;
  let fixture: ComponentFixture<WineryAdditionalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WineryAdditionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineryAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
