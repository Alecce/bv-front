import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminNongrapeComponent} from './admin-nongrape.component';

describe('AdminNongrapeComponent', () => {
  let component: AdminNongrapeComponent;
  let fixture: ComponentFixture<AdminNongrapeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNongrapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNongrapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
