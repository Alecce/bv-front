import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LanguageNavigateComponent} from './language-navigate.component';

describe('LanguageNavigateComponent', () => {
  let component: LanguageNavigateComponent;
  let fixture: ComponentFixture<LanguageNavigateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageNavigateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
