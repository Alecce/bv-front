import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WineryAddComponent} from './winery-add.component';

describe('WineryAddComponent', () => {
  let component: WineryAddComponent;
  let fixture: ComponentFixture<WineryAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WineryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
