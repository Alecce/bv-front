import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminBiodynamicComponent} from './admin-biodynamic.component';

describe('AdminBiodynamicComponent', () => {
  let component: AdminBiodynamicComponent;
  let fixture: ComponentFixture<AdminBiodynamicComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBiodynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBiodynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
