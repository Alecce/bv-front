import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CompetitionOneRowComponent} from '@src/app/schemas/competition-one-row/competition-one-row.component';

describe('CompetitionOneRowComponent', () => {
  let component: CompetitionOneRowComponent;
  let fixture: ComponentFixture<CompetitionOneRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionOneRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionOneRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
