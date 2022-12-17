import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminWineryMergingComponent} from './admin-winery-merging.component';

describe('AdminWineryMergingComponent', () => {
  let component: AdminWineryMergingComponent;
  let fixture: ComponentFixture<AdminWineryMergingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWineryMergingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWineryMergingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
