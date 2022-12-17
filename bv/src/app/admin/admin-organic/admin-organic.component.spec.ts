import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminOrganicComponent} from './admin-organic.component';

describe('AdminOrganicComponent', () => {
  let component: AdminOrganicComponent;
  let fixture: ComponentFixture<AdminOrganicComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrganicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrganicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
