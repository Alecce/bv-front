import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminAutodescriptionCategoriesComponent} from './admin-autodescription-categories.component';

describe('AdminAutodescriptionCategoriesComponent', () => {
  let component: AdminAutodescriptionCategoriesComponent;
  let fixture: ComponentFixture<AdminAutodescriptionCategoriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAutodescriptionCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAutodescriptionCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
