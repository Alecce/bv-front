import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminCorkComponent} from './admin-cork.component';

describe('AdminCorkComponent', () => {
  let component: AdminCorkComponent;
  let fixture: ComponentFixture<AdminCorkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
