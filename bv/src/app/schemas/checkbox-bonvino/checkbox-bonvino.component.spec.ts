import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CheckboxBonvinoComponent} from './checkbox-bonvino.component';

describe('CheckboxBonvinoComponent', () => {
  let component: CheckboxBonvinoComponent;
  let fixture: ComponentFixture<CheckboxBonvinoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxBonvinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
