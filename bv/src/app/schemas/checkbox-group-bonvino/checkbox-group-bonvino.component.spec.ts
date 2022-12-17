import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CheckboxGroupBonvinoComponent} from './checkbox-group-bonvino.component';

describe('CheckboxGroupBonvinoComponent', () => {
  let component: CheckboxGroupBonvinoComponent;
  let fixture: ComponentFixture<CheckboxGroupBonvinoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxGroupBonvinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxGroupBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
