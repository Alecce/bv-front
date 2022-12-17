import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminSupermergeComponent} from './admin-supermerge.component';

describe('AdminSupermergeComponent', () => {
  let component: AdminSupermergeComponent;
  let fixture: ComponentFixture<AdminSupermergeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSupermergeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSupermergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
