import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VisitinghoursComponent} from '@src/app/visitinghours/visitinghours.component';

describe('VisitinghoursComponent', () => {
  let component: VisitinghoursComponent;
  let fixture: ComponentFixture<VisitinghoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitinghoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitinghoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
