import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminBarrelsizeComponent} from './admin-barrelsize.component';

describe('AdminBarrelsizeComponent', () => {
  let component: AdminBarrelsizeComponent;
  let fixture: ComponentFixture<AdminBarrelsizeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBarrelsizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBarrelsizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
