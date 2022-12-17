import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TemperatureViewBonvinoComponent} from '@src/app/schemas/temperature-view-bonvino/temperature-view-bonvino.component';

describe('TemperatureViewBonvinoComponent', () => {
  let component: TemperatureViewBonvinoComponent;
  let fixture: ComponentFixture<TemperatureViewBonvinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperatureViewBonvinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureViewBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
