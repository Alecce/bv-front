import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WinnerListComponent} from './winner-list.component';

describe('WinnerListComponent', () => {
  let component: WinnerListComponent;
  let fixture: ComponentFixture<WinnerListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WinnerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
