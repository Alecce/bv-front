import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SelectBonvinoComponent} from './select-bonvino.component';

describe('SelectBonvinoComponent', () => {
  let component: SelectBonvinoComponent;
  let fixture: ComponentFixture<SelectBonvinoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBonvinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
