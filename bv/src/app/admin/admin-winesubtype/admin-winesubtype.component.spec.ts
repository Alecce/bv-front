import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminWinesubtypeComponent} from './admin-winesubtype.component';

describe('AdminWinesubtypeComponent', () => {
  let component: AdminWinesubtypeComponent;
  let fixture: ComponentFixture<AdminWinesubtypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWinesubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWinesubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
