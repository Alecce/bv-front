import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminSparklingComponent} from './admin-sparkling.component';

describe('AdminSparklingComponent', () => {
  let component: AdminSparklingComponent;
  let fixture: ComponentFixture<AdminSparklingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSparklingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSparklingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
