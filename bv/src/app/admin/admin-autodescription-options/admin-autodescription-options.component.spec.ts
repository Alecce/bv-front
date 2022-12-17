import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminAutodescriptionOptionsComponent} from './admin-autodescription-options.component';

describe('AdminAutodescriptionOptionsComponent', () => {
  let component: AdminAutodescriptionOptionsComponent;
  let fixture: ComponentFixture<AdminAutodescriptionOptionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAutodescriptionOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAutodescriptionOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
