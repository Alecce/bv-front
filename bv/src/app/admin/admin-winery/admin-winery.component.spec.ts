import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminWineryComponent} from './admin-winery.component';

describe('AdminWineryComponent', () => {
  let component: AdminWineryComponent;
  let fixture: ComponentFixture<AdminWineryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWineryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWineryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
