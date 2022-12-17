import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminAutodescriptionComponent} from './admin-autodescription.component';

describe('AdminAutodescriptionComponent', () => {
  let component: AdminAutodescriptionComponent;
  let fixture: ComponentFixture<AdminAutodescriptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAutodescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAutodescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
