import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {QualityWinerySubtableComponent} from './quality-winery-subtable.component';

describe('QualityWinerySubtableComponent', () => {
  let component: QualityWinerySubtableComponent;
  let fixture: ComponentFixture<QualityWinerySubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityWinerySubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityWinerySubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
