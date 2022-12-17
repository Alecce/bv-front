import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WineryBasicComponent} from './winery-basic.component';

describe('WineryBasicComponent', () => {
  let component: WineryBasicComponent;
  let fixture: ComponentFixture<WineryBasicComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WineryBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineryBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
