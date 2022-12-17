import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LanguageNavigateMobileComponent} from './language-navigate-mobile.component';

describe('LanguageNavigateMobileComponent', () => {
  let component: LanguageNavigateMobileComponent;
  let fixture: ComponentFixture<LanguageNavigateMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageNavigateMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageNavigateMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
