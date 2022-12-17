import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminVeganComponent} from './admin-vegan.component';

describe('AdminVeganComponent', () => {
  let component: AdminVeganComponent;
  let fixture: ComponentFixture<AdminVeganComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVeganComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVeganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
