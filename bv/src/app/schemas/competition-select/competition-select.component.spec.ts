import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CompetitionSelectComponent} from '@src/app/schemas/competition-select/competition-select.component';

describe('CompetitionSelectComponent', () => {
  let component: CompetitionSelectComponent;
  let fixture: ComponentFixture<CompetitionSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
