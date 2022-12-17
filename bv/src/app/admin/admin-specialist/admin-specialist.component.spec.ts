import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminSpecialistComponent} from './admin-specialist.component';

describe('AdminSpecialistComponent', () => {
  let component: AdminSpecialistComponent;
  let fixture: ComponentFixture<AdminSpecialistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSpecialistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
