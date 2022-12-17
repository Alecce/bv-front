import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminBottleComponent} from '@src/app/admin/admin-bottle/admin-bottle.component';

describe('AdminBottleComponent', () => {
  let component: AdminBottleComponent;
  let fixture: ComponentFixture<AdminBottleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBottleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBottleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
