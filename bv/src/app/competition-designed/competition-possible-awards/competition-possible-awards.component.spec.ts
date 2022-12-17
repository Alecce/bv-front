import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CompetitionPossibleAwardsComponent} from '@src/app/competition-designed/competition-possible-awards/competition-possible-awards.component';

describe('CompetitionPossibleAwardsComponent', () => {
  let component: CompetitionPossibleAwardsComponent;
  let fixture: ComponentFixture<CompetitionPossibleAwardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionPossibleAwardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionPossibleAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
