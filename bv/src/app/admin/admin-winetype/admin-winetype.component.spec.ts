import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminWinetypeComponent} from './admin-winetype.component';

describe('AdminWinetypeComponent', () => {
  let component: AdminWinetypeComponent;
  let fixture: ComponentFixture<AdminWinetypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWinetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWinetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
