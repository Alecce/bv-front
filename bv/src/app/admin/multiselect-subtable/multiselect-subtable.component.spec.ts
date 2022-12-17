import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MultiselectSubtableComponent} from './multiselect-subtable.component';

describe('MultiselectSubtableComponent', () => {
  let component: MultiselectSubtableComponent;
  let fixture: ComponentFixture<MultiselectSubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiselectSubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectSubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
