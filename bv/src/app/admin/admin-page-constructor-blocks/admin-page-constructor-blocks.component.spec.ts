import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminPageConstructorBlocksComponent} from './admin-page-constructor-blocks.component';

describe('AdminPageConstructorBlocksComponent', () => {
  let component: AdminPageConstructorBlocksComponent;
  let fixture: ComponentFixture<AdminPageConstructorBlocksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPageConstructorBlocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageConstructorBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
