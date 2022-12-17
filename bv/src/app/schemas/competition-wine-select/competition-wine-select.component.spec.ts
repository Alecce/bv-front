import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CompetitionWineSelectComponent} from '@src/app/schemas/competition-wine-select/competition-wine-select.component';

describe('CompetitionWineSelectComponent', () => {
  let component: CompetitionWineSelectComponent;
  let fixture: ComponentFixture<CompetitionWineSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionWineSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionWineSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
