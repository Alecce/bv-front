import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GrapesSubtableComponent} from './grapes-subtable.component';

describe('GrapesSubtableComponent', () => {
  let component: GrapesSubtableComponent;
  let fixture: ComponentFixture<GrapesSubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GrapesSubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrapesSubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
