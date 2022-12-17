import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CompetitionAdditionalComponent} from '@src/app/competition-designed/competition-additional/competition-additional.component';

describe('CompetitionAdditionalComponent', () => {
  let component: CompetitionAdditionalComponent;
  let fixture: ComponentFixture<CompetitionAdditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionAdditionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
