import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminVineyardComponent} from './admin-vineyard.component';

describe('AdminVineyardComponent', () => {
  let component: AdminVineyardComponent;
  let fixture: ComponentFixture<AdminVineyardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVineyardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVineyardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
