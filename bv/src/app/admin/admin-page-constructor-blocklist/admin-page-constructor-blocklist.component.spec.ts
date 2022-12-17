import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminPageConstructorBlocklistComponent} from './admin-page-constructor-blocklist.component';

describe('AdminPageConstructorBlocklistComponent', () => {
  let component: AdminPageConstructorBlocklistComponent;
  let fixture: ComponentFixture<AdminPageConstructorBlocklistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPageConstructorBlocklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageConstructorBlocklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
