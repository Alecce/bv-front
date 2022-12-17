import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {QualityListComponent} from './quality-list.component';

describe('QualityListComponent', () => {
  let component: QualityListComponent;
  let fixture: ComponentFixture<QualityListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
