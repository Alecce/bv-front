import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CompetitionBasicComponent} from '@src/app/competition-designed/competition-basic/competition-basic.component';

describe('CompetitionBasicComponent', () => {
  let component: CompetitionBasicComponent;
  let fixture: ComponentFixture<CompetitionBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
