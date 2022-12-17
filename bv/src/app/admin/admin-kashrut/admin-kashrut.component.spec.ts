import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminKashrutComponent} from './admin-kashrut.component';

describe('AdminKashrutComponent', () => {
  let component: AdminKashrutComponent;
  let fixture: ComponentFixture<AdminKashrutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminKashrutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKashrutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
