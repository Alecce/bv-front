import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SubtableComponent} from './subtable.component';

describe('SubtableComponent', () => {
  let component: SubtableComponent;
  let fixture: ComponentFixture<SubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
