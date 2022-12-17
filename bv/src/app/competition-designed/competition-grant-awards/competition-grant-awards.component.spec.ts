import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CompetitionGrantAwardsComponent} from 'competition-grant-awards.component';

describe('CompetitionGrantAwardsComponent', () => {
  let component: CompetitionGrantAwardsComponent;
  let fixture: ComponentFixture<CompetitionGrantAwardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionGrantAwardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionGrantAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
