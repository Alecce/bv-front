import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminLanguageComponent} from './admin-language.component';

describe('AdminLanguageComponent', () => {
  let component: AdminLanguageComponent;
  let fixture: ComponentFixture<AdminLanguageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
