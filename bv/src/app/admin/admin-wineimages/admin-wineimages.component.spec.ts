import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminWineimagesComponent} from './admin-wineimages.component';

describe('AdminWineimagesComponent', () => {
  let component: AdminWineimagesComponent;
  let fixture: ComponentFixture<AdminWineimagesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWineimagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWineimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
