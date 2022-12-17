import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminVisitorsComponent} from './admin-visitors.component';

describe('AdminVisitorsComponent', () => {
  let component: AdminVisitorsComponent;
  let fixture: ComponentFixture<AdminVisitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVisitorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
