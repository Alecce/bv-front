import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {QualitySubtableComponent} from './quality-subtable.component';

describe('QualitySubtableComponent', () => {
  let component: QualitySubtableComponent;
  let fixture: ComponentFixture<QualitySubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QualitySubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualitySubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
