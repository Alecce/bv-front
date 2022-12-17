import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {VisittimeSubtableComponent} from './visittime-subtable.component';

describe('VisittimeSubtableComponent', () => {
  let component: VisittimeSubtableComponent;
  let fixture: ComponentFixture<VisittimeSubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisittimeSubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisittimeSubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
