import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DescriptionGradesViewComponent} from '@src/app/wines-designed/description-grades-view/description-grades-view.component';

describe('DescriptionGradesViewComponent', () => {
  let component: DescriptionGradesViewComponent;
  let fixture: ComponentFixture<DescriptionGradesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionGradesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionGradesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
