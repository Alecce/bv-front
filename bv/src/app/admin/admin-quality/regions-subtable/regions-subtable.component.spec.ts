import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RegionsSubtableComponent} from './regions-subtable.component';

describe('RegionsSubtableComponent', () => {
  let component: RegionsSubtableComponent;
  let fixture: ComponentFixture<RegionsSubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionsSubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionsSubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
