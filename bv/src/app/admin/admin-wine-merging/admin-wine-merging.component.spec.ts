import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminWineMergingComponent} from './admin-wine-merging.component';

describe('AdminWineMergingComponent', () => {
  let component: AdminWineMergingComponent;
  let fixture: ComponentFixture<AdminWineMergingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWineMergingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWineMergingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
