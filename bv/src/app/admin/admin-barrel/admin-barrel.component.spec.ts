import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminBarrelComponent} from './admin-barrel.component';

describe('AdminBarrelComponent', () => {
  let component: AdminBarrelComponent;
  let fixture: ComponentFixture<AdminBarrelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBarrelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBarrelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
