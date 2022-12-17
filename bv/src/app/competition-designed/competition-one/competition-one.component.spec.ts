import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CompetitionOneComponent} from '@src/app/competition-designed/competition-one/competition-one.component';

describe('CompetitionOneComponent', () => {
  let component: CompetitionOneComponent;
  let fixture: ComponentFixture<CompetitionOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
