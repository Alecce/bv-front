import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WinesSubtableComponent} from './wines-subtable.component';

describe('WinesSubtableComponent', () => {
  let component: WinesSubtableComponent;
  let fixture: ComponentFixture<WinesSubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WinesSubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinesSubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
