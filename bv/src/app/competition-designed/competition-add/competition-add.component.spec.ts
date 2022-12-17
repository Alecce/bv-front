import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CompetitionAddComponent} from '@src/app/competition-designed/competition-add/competition-add.component';

describe('CompetitionAddComponent', () => {
  let component: CompetitionAddComponent;
  let fixture: ComponentFixture<CompetitionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
