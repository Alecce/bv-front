import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminUserlistComponent} from './admin-userlist.component';

describe('AdminUserlistComponent', () => {
  let component: AdminUserlistComponent;
  let fixture: ComponentFixture<AdminUserlistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
