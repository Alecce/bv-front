import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminWineComponent} from './admin-wine.component';

describe('AdminWineComponent', () => {
  let component: AdminWineComponent;
  let fixture: ComponentFixture<AdminWineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
