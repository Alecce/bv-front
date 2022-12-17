import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DescriptionGradesAddComponent} from '@src/app/wines-designed/description-grades-add/description-grades-add.component';

describe('DescriptionGradesAddComponent', () => {
  let component: DescriptionGradesAddComponent;
  let fixture: ComponentFixture<DescriptionGradesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionGradesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionGradesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
