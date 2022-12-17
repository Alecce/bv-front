import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminPageConstructorPagelistComponent} from './admin-page-constructor-pagelist.component';

describe('AdminPageConstructorPagelistComponent', () => {
  let component: AdminPageConstructorPagelistComponent;
  let fixture: ComponentFixture<AdminPageConstructorPagelistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPageConstructorPagelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageConstructorPagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
