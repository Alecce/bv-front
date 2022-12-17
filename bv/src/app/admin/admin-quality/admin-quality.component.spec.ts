import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminQualityComponent} from './admin-quality.component';

describe('AdminQualityComponent', () => {
  let component: AdminQualityComponent;
  let fixture: ComponentFixture<AdminQualityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
