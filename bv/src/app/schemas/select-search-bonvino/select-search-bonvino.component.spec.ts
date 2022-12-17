import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SelectSearchBonvinoComponent} from './select-search-bonvino.component';

describe('SelectSearchBonvinoComponent', () => {
  let component: SelectSearchBonvinoComponent;
  let fixture: ComponentFixture<SelectSearchBonvinoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSearchBonvinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSearchBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
