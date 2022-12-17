import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminSuperlistComponent} from './admin-superlist.component';

describe('AdminSuperlistComponent', () => {
  let component: AdminSuperlistComponent;
  let fixture: ComponentFixture<AdminSuperlistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSuperlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSuperlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
