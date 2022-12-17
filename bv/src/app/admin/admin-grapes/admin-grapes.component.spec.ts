import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminGrapesComponent} from './admin-grapes.component';

describe('AdminGrapesComponent', () => {
  let component: AdminGrapesComponent;
  let fixture: ComponentFixture<AdminGrapesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGrapesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGrapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
