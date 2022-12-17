import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminPageConstructorBlockoptionlistComponent} from './admin-page-constructor-blockoptionlist.component';

describe('AdminPageConstructorBlockoptionlistComponent', () => {
  let component: AdminPageConstructorBlockoptionlistComponent;
  let fixture: ComponentFixture<AdminPageConstructorBlockoptionlistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPageConstructorBlockoptionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageConstructorBlockoptionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
