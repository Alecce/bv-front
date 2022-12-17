import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminGrapeClonesComponent} from './admin-grape-clones.component';

describe('AdminGrapeClonesComponent', () => {
  let component: AdminGrapeClonesComponent;
  let fixture: ComponentFixture<AdminGrapeClonesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGrapeClonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGrapeClonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
