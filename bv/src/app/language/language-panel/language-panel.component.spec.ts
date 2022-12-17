import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LanguagePanelComponent} from './language-panel.component';

describe('LanguagePanelComponent', () => {
  let component: LanguagePanelComponent;
  let fixture: ComponentFixture<LanguagePanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
